import json
import datetime
from contextlib import closing
from framework.httpexceptions import HttpNotFoundException
from framework.httpexceptions import HttpBadRequestException

from controllers.basecontroller import BaseController

from models.service.question import Question
from models.db.question import DbQuestion

class GenericController(BaseController):

    def __init__(self, clazz, db_clazz):
        super().__init__()
        self.clazz = clazz
        self.db_clazz = db_clazz

    def get(self, state, id):
        (request, response, session) = state.unfold()

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

            response.setJsonBody(json.dumps(obj_dict))

        return state

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

    def delete(self, state, id):
        (request, response, session) = state.unfold()

        try:
            id = int(id)
        except ValueError:
            raise HttpBadRequestException()

        with closing(self._database_session_maker()) as database_session:
            db_obj = database_session.query(self.db_clazz).filter(self.db_clazz.id==id).first()

            if not db_obj:
                raise HttpNotFoundException()
            database_session.delete(db_obj)
            database_session.commit()

        return state

    def list(self, state):
        (request, response, session) = state.unfold()

        with closing(self._database_session_maker()) as database_session:
            db_objs = database_session.query(self.db_clazz).order_by(self.db_clazz.id).all()

            obj_datas = []
            for db_obj in db_objs:
                obj_data = self.clazz.from_db(db_obj).to_dict()
                obj_datas.append(obj_data)

            response.setJsonBody(json.dumps(obj_datas))

        return state

    def bindRoutes(self, router, path):
        router.addMapping(r"^/" + path + "/([^/]+)$", self.get, ['GET'])
        router.addMapping(r"^/" + path + "/([^/]+)$", self.save, ['POST'])
        router.addMapping(r"^/" + path + "/([^/]+)$", self.delete, ['DELETE'])
        router.addMapping(r"^/" + path + "/$", self.add, ['PUT'])
        router.addMapping(r"^/" + path + "/$", self.list, ['GET'])
