import json
from framework.httpexceptions import HttpNotFoundException
from framework.httpexceptions import HttpBadRequestException

from controllers.basecontroller import BaseController

from models.test import Test
from models.question import Question
from models.answer import Answer

class RunTestController(BaseController):

    def __init__(self):
        super().__init__()

    def getTest(self, state, test_id):
        (request, response, session) = state.unfold()

        try:
            test_id = int(test_id)
        except ValueError:
            raise HttpBadRequestException()

        database_session = self._database_session_maker()

        try:
            test = database_session.query(Test).filter(Test.id==test_id).first()

            if not test:
                raise HttpNotFoundException()

            test_data = json.loads(test.data)

            for question_element in [element for element in test_data["content"] if element["type"] == 'question']:
                if question_element.get("data", {}).get("answers"):
                    del question_element["data"]["answers"]
                if question_element.get("data", {}).get("id"):
                    del question_element["data"]["id"]
            test_data["id"] = test.id

            response.setJsonBody(json.dumps(test_data))
        finally:
            database_session.close()

        return state

    def submitProgess(self, state, test_id, session_id):
        return state

    def submitAnswer(self, state, test_id, session_id):
        return state

    def showTest(self, state, test_id):
        return state

    def _requestAccessCodeViaEmail(self, state, test, database_session):
        pass

    def _requestAccessCodeViaLogin(self, state, test, database_session):
        pass

    def provideBestRouteToTest(self, state, test_id):
        (request, response, session) = state.unfold()

        try:
            test_id = int(test_id)
        except ValueError:
            raise HttpBadRequestException()

        database_session = self._database_session_maker()

        try:
            test = database_session.query(Test).filter(Test.id==test_id).first()

            if not test or not test.status == Test.STATUS_OPEN:
                raise HttpNotFoundException()

            test_data = json.loads(test.data)
            if test.get_invite_mode() == Test.INVITE_MODE_NONE:
                raise HttpNotFoundException()
            elif test.get_invite_mode() in [Test.INVITE_MODE_EMAIL]:
                return self._requestAccessCodeViaEmail(state, test, database_session)
            elif test.get_invite_mode() in [Test.INVITE_MODE_URL_LOGIN]:
                return self._requestAccessCodeViaLogin(state, test, database_session)

        finally:
            database_session.close()

        return state
