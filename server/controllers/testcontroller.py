import json
import datetime
from framework.httpexceptions import HttpNotFoundException
from framework.httpexceptions import HttpBadRequestException

from controllers.basecontroller import BaseController

from models.test import Test
from models.question import Question

class TestController(BaseController):

    def __init__(self):
        super().__init__()

    def getTest(self, state, id):
        (request, response, session) = state.unfold()

        try:
            id = int(id)
        except ValueError:
            raise HttpBadRequestException()

        database_session = self._database_session_maker()

        try:
            test = database_session.query(Test).filter(Test.id==id).first()

            if not test:
                raise HttpNotFoundException()

            test_data = json.loads(test.data)
            self._setJsonFromFields(test, test_data)

            for question_element in [element for element in test_data["content"] if element["type"] == 'question']:
                if question_element.get("data", {}).get("id"):
                    id = question_element["data"]["id"]
                    question = database_session.query(Question).filter(Question.id==id).first()
                    if question:
                        # If question is still in the database refresh the question
                        question_element["data"] = json.loads(question.data)
                        question_element["data"]["id"] = id
                    else:
                        # If the question cannot be found make the question local by deleting the id
                        del question_element["data"]["id"]

            response.setJsonBody(json.dumps(test_data))
        finally:
            database_session.close()

        return state

    def addTest(self, state):
        (request, response, session) = state.unfold()

        database_session = self._database_session_maker()

        try:
            test_data = request.body
            test = Test()
            self._setFieldsFromJson(test_data, test)
            self._deleteFieldsFromJson(test_data)
            test.data = json.dumps(test_data)

            database_session.add(test)
            database_session.commit()

            self._setJsonFromFields(test, test_data)

            response.setJsonBody(json.dumps(test_data))

        finally:
            database_session.close()

        return state

    def saveTest(self, state, id):
        (request, response, session) = state.unfold()

        try:
            id = int(id)
        except ValueError:
            raise HttpBadRequestException()

        database_session = self._database_session_maker()

        try:
            test = database_session.query(Test).filter(Test.id==id).first()

            if not test:
                raise HttpNotFoundException()

            test_data = request.body
            self._setFieldsFromJson(test_data, test)
            self._deleteFieldsFromJson(test_data)
            test.data = json.dumps(test_data)
            self._setJsonFromFields(test, test_data)
            database_session.add(test)
            database_session.commit()

            response.setJsonBody(json.dumps(test_data))
        finally:
            database_session.close()

        return state

    def deleteTest(self, state, id):
        (request, response, session) = state.unfold()

        try:
            id = int(id)
        except ValueError:
            raise HttpBadRequestException()

        database_session = self._database_session_maker()

        try:
            test = database_session.query(Test).filter(Test.id==id).first()

            if not test:
                raise HttpNotFoundException()
            database_session.delete(test)
            database_session.commit()
        finally:
            database_session.close()

        return state

    def listTest(self, state):
        (request, response, session) = state.unfold()

        database_session = self._database_session_maker()

        try:
            tests = database_session.query(Test).order_by(Test.id).all()

            tests_data = []
            for test in tests:
                test_data = json.loads(test.data)
                self._setJsonFromFields(test, test_data)

                tests_data.append(test_data)

            response.setJsonBody(json.dumps(tests_data))

        finally:
            database_session.close()

        return state

    def _setFieldsFromJson(self, json, test):
        # Never set id
        #if json.get("id"):
        #    test.id = json.get("id")

        if json.get("planning", {}).get("start_date"):
            test.start_date = datetime.datetime.strptime(json.get("planning", {}).get("start_date"), "%Y-%m-%dT%H:%M:%S.000Z")

        if json.get("planning", {}).get("end_date"):
            test.end_date = datetime.datetime.strptime(json.get("planning", {}).get("end_date"), "%Y-%m-%dT%H:%M:%S.000Z")

        test.status = json.get("planning", {}).get("status", Test.STATUS_PLANNED)

    def _deleteFieldsFromJson(self, json):
        if json.get("id"):
            del json["id"]

        if json.get("planning", {}).get("start_date"):
            del json["planning"]["start_date"]

        if json.get("planning", {}).get("end_date"):
            del json["planning"]["end_date"]

        if json.get("planning", {}).get("status"):
            del json["planning"]["status"]


    def _setJsonFromFields(self, test, json):
        json["id"] = test.id
        if not json.get("planning"):
            json["planning"] = {}
        if test.start_date:
            json["planning"]["start_date"] = test.start_date.strftime("%Y-%m-%dT%H:%M:%S.000Z")

        if test.end_date:
            json["planning"]["end_date"] = test.end_date.strftime("%Y-%m-%dT%H:%M:%S.000Z")
        json["planning"]["status"] = test.status