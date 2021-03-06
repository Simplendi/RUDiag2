from contextlib import closing
import json
import itertools
from framework.httpexceptions import HttpUnauthorizedException, HttpNotFoundException, HttpBadRequestException
from controllers.genericcontroller import GenericController
from helpers.qtigenerator import QtiGenerator
from models.db.question import DbQuestion
from models.db.metadata import DbMetadata
from models.service.question import Question
from models.service.metadata import Metadata


class QuestionController(GenericController):

    def __init__(self):
        super().__init__(Question, DbQuestion)


    def _is_owner(self, session, question):
        return self._get_user_id(session) is not None and self._get_user_id(session) in question.owners


    def runBeforeAdd(self, state, obj):
        (request, response, session) = state.unfold()

        if not self._get_user_id(session):
            raise HttpUnauthorizedException

        return obj


    def runBeforeDelete(self, state, obj):
        (request, response, session) = state.unfold()

        if not self._is_user_admin(session) and not self._is_owner(session, obj):
            raise HttpUnauthorizedException

        return obj

    def runAfterSaveLoad(self, state, obj):
        (request, response, session) = state.unfold()

        if not self._is_user_admin(session) and not self._is_owner(session, obj):
            raise HttpUnauthorizedException

        return obj

    def list(self, state):
        (request, response, session) = state.unfold()

        if not self._get_user_id(session):
            raise HttpUnauthorizedException

        with closing(self._database_session_maker()) as database_session:
            questions = [Question.from_db(db_obj) for db_obj in database_session.query(self.db_clazz).order_by(self.db_clazz.id).all()]
            metadata = [Metadata.from_db(db_obj) for db_obj in database_session.query(DbMetadata).all()]

            filter = json.loads(request.query.get("filter"))
            empty_filter = request.query.get("empty_filter", "false") == "true"

            question_datas = []
            for question in itertools.islice(self.apply_filter(filter, empty_filter, questions, metadata), 100):
                question_datas.append(question.to_dict())

            response.setJsonBody(json.dumps(question_datas))

        return state

    def qti_export(self, state, id):
        (request, response, session) = state.unfold()

        if self.int_id:
            try:
                id = int(id)
            except ValueError:
                raise HttpBadRequestException()

        with closing(self._database_session_maker()) as database_session:
            db_obj = database_session.query(self.db_clazz).filter(self.db_clazz.id==id).first()

            if not db_obj:
                raise HttpNotFoundException()

            obj = self.clazz.from_db(db_obj)
            obj_dict = obj.to_dict()

            # Set Content Disposition such that the file will be downloaded
            response.headers["Content-Disposition"] = "attachment; filename=" + str(obj.id) + ".xml"
            response.content_type = "application/xml"
            response.body = QtiGenerator().generate(obj_dict)

        return state



    def index_metadata(self, metadata):
        metadata_index = {}
        for metadata_obj in metadata:
            metadata_index[metadata_obj.name] = metadata_obj

        return metadata_index

    def apply_filter(self, filter, empty_filter, questions, metadatas):
        metadata_index = self.index_metadata(metadatas)

        for question in questions:

            filtered = False

            if empty_filter and len(question.metadata) != 0:
                filtered = True
                break

            for (filter_metadata_name, filter_metadata_values) in filter.items():
                if not question.metadata.get(filter_metadata_name):
                    filtered = True
                    break

                if not metadata_index.get(filter_metadata_name):
                    filtered = True
                    break

                metadata = metadata_index.get(filter_metadata_name)

                if metadata.type == Metadata.TYPE_TEXT or metadata.type == Metadata.TYPE_URL:
                    if not len(set(filter_metadata_values).intersection(question.metadata[filter_metadata_name])) == len(filter_metadata_values):
                        filtered = True
                        break
                elif metadata.type == Metadata.TYPE_TREE:
                    for filter_metadata_value in filter_metadata_values:
                        match = False
                        for metadata_value in question.metadata[filter_metadata_name]:
                            if metadata_value.startswith(filter_metadata_value):
                                match = True

                        if not match:
                            filtered = True
                            break


            if not filtered:
                yield question


    def bindRoutes(self, router, path):
        router.addMapping(r"^/" + path + "/([^/]+)/export$", self.qti_export, ['GET'])
        super().bindRoutes(router, path)
