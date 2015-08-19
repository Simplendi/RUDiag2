import json
import datetime
from contextlib import closing
from framework.httpexceptions import HttpNotFoundException
from framework.httpexceptions import HttpBadRequestException

from controllers.basecontroller import BaseController

from models.service.test import Test
from models.db.test import DbTest

class TestController(BaseController):

    def __init__(self):
        super().__init__()

    def getTest(self, state, id):
        (request, response, session) = state.unfold()

        try:
            id = int(id)
        except ValueError:
            raise HttpBadRequestException()

        with closing(self._database_session_maker()) as database_session:
            db_test = database_session.query(DbTest).filter(DbTest.id==id).first()

            if not db_test:
                raise HttpNotFoundException()

            test = Test.from_db(db_test)
            test_dict = test.to_dict()

            response.setJsonBody(json.dumps(test_dict))

        return state

    def addTest(self, state):
        (request, response, session) = state.unfold()

        with closing(self._database_session_maker()) as database_session:
            test_dict = request.body
            test = Test.from_dict(test_dict)
            db_test = test.to_db()

            database_session.add(db_test)
            database_session.commit()

            test = Test.from_db(db_test, test)
            test_dict = test.to_dict(test_dict)

            response.setJsonBody(json.dumps(test_dict))


        return state

    def saveTest(self, state, id):
        (request, response, session) = state.unfold()

        try:
            id = int(id)
        except ValueError:
            raise HttpBadRequestException()

        with closing(self._database_session_maker()) as database_session:
            db_test = database_session.query(DbTest).filter(DbTest.id==id).first()

            if not db_test:
                raise HttpNotFoundException()

            test_dict = request.body
            test = Test.from_dict(test_dict)
            db_test = test.to_db(db_test)

            database_session.add(db_test)
            database_session.commit()

            test = Test.from_db(db_test, test)
            test_dict = test.to_dict(test_dict)

            response.setJsonBody(json.dumps(test_dict))

        return state

    def deleteTest(self, state, id):
        (request, response, session) = state.unfold()

        try:
            id = int(id)
        except ValueError:
            raise HttpBadRequestException()

        with closing(self._database_session_maker()) as database_session:
            db_test = database_session.query(DbTest).filter(DbTest.id==id).first()

            if not db_test:
                raise HttpNotFoundException()
            database_session.delete(db_test)
            database_session.commit()

        return state

    def listTest(self, state):
        (request, response, session) = state.unfold()

        with closing(self._database_session_maker()) as database_session:
            db_tests = database_session.query(DbTest).order_by(DbTest.id).all()

            tests_data = []
            for db_test in db_tests:
                test_data = Test.from_db(db_test).to_dict()
                tests_data.append(test_data)

            response.setJsonBody(json.dumps(tests_data))

        return state