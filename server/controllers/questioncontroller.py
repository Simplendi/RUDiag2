from contextlib import closing
import json
from framework.httpexceptions import HttpUnauthorizedException
from controllers.genericcontroller import GenericController
from models.db.question import DbQuestion
from models.service.question import Question


class QuestionController(GenericController):

    def __init__(self):
        super().__init__(Question, DbQuestion)


    def _is_owner(self, session, question):
        return self._get_user_id(session) is not None and self._get_user_id(session) in question.owners


    def runBeforeAdd(self, state, obj):
        (request, response, session) = state.unfold()

        if not self._get_user_id(session):
            raise HttpUnauthorizedException


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
            db_objs = database_session.query(self.db_clazz).order_by(self.db_clazz.id).all()

            obj_datas = []
            for db_obj in db_objs:
                obj_datas.append(self.clazz.from_db(db_obj).to_dict())

            response.setJsonBody(json.dumps(obj_datas))

        return state
