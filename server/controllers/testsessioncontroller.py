import json
from contextlib import closing
from controllers.genericcontroller import GenericController
from framework.httpexceptions import HttpBadRequestException
from models.db.testsession import DbTestSession
from models.service.testsession import TestSession


class TestSessionController(GenericController):

    def __init__(self):
        super().__init__(TestSession, DbTestSession, False)

    def list(self, state):
        (request, response, session) = state.unfold()

        with closing(self._database_session_maker()) as database_session:
            try:
                test_id = int(request.query.get("test_id"))
            except:
                raise HttpBadRequestException()

            db_objs = database_session.query(self.db_clazz).order_by(self.db_clazz.id).filter(self.db_clazz.test_id == test_id).all()

            obj_datas = []
            for db_obj in db_objs:
                obj_data = self.clazz.from_db(db_obj).to_dict()
                obj_datas.append(obj_data)

            response.setJsonBody(json.dumps(obj_datas))

        return state