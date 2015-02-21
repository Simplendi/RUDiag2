import json
from framework.httpexceptions import HttpNotFoundException

from controllers.basecontroller import BaseController

from models.test import Test
from models.question import Question

class TestController(BaseController):

    def __init__(self):
        super().__init__()

    def getTest(self, state, id):
        (request, response, session) = state.unfold()

        id = int(id)

        database_session = self._database_session_maker()

        try:
            test = database_session.query(Test).filter(Test.id==id).first()

            if not test:
                raise HttpNotFoundException()

            test_data = json.loads(test.data)

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
            test_data["id"] = test.id

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
            test.data = json.dumps(test_data)

            database_session.add(test)
            database_session.commit()

            test_data["id"] = test.id

            response.setJsonBody(json.dumps(test_data))

        finally:
            database_session.close()

        return state

    def saveTest(self, state, id):
        (request, response, session) = state.unfold()

        id = int(id)

        database_session = self._database_session_maker()

        try:
            test = database_session.query(Test).filter(Test.id==id).first()

            if not test:
                raise HttpNotFoundException()

            test_data = request.body
            del test_data["id"]
            test.data = json.dumps(test_data)
            test_data["id"] = test.id
            database_session.add(test)
            database_session.commit()

            response.setJsonBody(json.dumps(test_data))
        finally:
            database_session.close()

        return state

    def deleteTest(self, state):
        return state

    def listTest(self, state):
        (request, response, session) = state.unfold()

        database_session = self._database_session_maker()

        try:
            tests = database_session.query(Test).order_by(Test.id).all()

            tests_data = []
            for test in tests:
                test_data = json.loads(test.data)
                test_data["id"] = test.id

                tests_data.append(test_data)

            response.setJsonBody(json.dumps(tests_data))

        finally:
            database_session.close()

        return state