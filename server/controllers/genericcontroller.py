import json
import hashlib
import datetime
from contextlib import closing
from framework.httpexceptions import HttpNotFoundException
from framework.httpexceptions import HttpBadRequestException

from controllers.basecontroller import BaseController

from models.service.question import Question
from models.db.question import DbQuestion

class GenericController(BaseController):

    def __init__(self, clazz, db_clazz, int_id = True):
        super().__init__()
        self.clazz = clazz
        self.db_clazz = db_clazz
        self.int_id = int_id

    def get(self, state, id):
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
            obj = self.runBeforeGet(state, obj)
            obj_dict = obj.to_dict()

            response.setJsonBody(json.dumps(obj_dict))

        return state

    def runBeforeGet(self, state, obj):
        return obj

    def add(self, state):
        (request, response, session) = state.unfold()

        with closing(self._database_session_maker()) as database_session:
            obj_dict = request.body
            obj = self.clazz.from_dict(obj_dict)

            obj = self.runBeforeAdd(state, obj)

            db_obj = obj.to_db()

            database_session.add(db_obj)
            database_session.commit()

            obj = self.clazz.from_db(db_obj, obj)
            obj_dict = obj.to_dict()

            response.setJsonBody(json.dumps(obj_dict))


        return state

    def runBeforeAdd(self, state, obj):
        return obj

    def save(self, state, id):
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

            obj_dict = request.body
            obj = self.clazz.from_db(db_obj)
            obj = self.runAfterSaveLoad(state, obj)
            obj = self.clazz.from_dict(obj_dict, obj)
            obj = self.runBeforeSave(state, obj)
            db_obj = obj.to_db(db_obj)

            database_session.add(db_obj)
            database_session.commit()

            obj = self.clazz.from_db(db_obj, obj)
            obj_dict = obj.to_dict()

            response.setJsonBody(json.dumps(obj_dict))

        return state

    def runBeforeSave(self, state, obj):
        return obj

    def runAfterSaveLoad(self, state, obj):
        return obj


    def delete(self, state, id):
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
            self.runBeforeDelete(state, obj)

            database_session.delete(db_obj)
            database_session.commit()

        return state

    def runBeforeDelete(self, state, obj):
        return obj

    def list(self, state):
        (request, response, session) = state.unfold()

        self.runBeforeList(state)

        with closing(self._database_session_maker()) as database_session:
            db_objs = database_session.query(self.db_clazz).order_by(self.db_clazz.id).all()

            obj_datas = []
            for db_obj in db_objs:
                obj_data = self.clazz.from_db(db_obj).to_dict()
                obj_datas.append(obj_data)

            response.setJsonBody(json.dumps(obj_datas))

        return state

    def runBeforeList(self, state):
        pass

    def _get_user_id(self, session):
        user_data = json.loads(session.get("user", '{}'))
        return user_data.get("id")

    def _is_user_admin(self, session):
        user_data = json.loads(session.get("user", '{}'))
        return user_data.get("is_admin", False)

    def bindRoutes(self, router, path):
        router.addMapping(r"^/" + path + "/([^/]+)$", self.get, ['GET'])
        router.addMapping(r"^/" + path + "/([^/]+)$", self.save, ['POST'])
        router.addMapping(r"^/" + path + "/([^/]+)$", self.delete, ['DELETE'])
        router.addMapping(r"^/" + path + "/$", self.add, ['PUT'])
        router.addMapping(r"^/" + path + "/$", self.list, ['GET'])
