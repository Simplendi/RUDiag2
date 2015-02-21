import json
from framework.httpexceptions import HttpNotFoundException

from controllers.basecontroller import BaseController

from models.question import Question

class QuestionController(BaseController):

    def __init__(self):
        super().__init__()

    def getQuestion(self, state, id):
        (request, response, session) = state.unfold()

        id = int(id)

        database_session = self._database_session_maker()

        try:
            question = database_session.query(Question).filter(Question.id==id).first()

            if not question:
                raise HttpNotFoundException()

            question_data = json.loads(question.data)
            question_data["id"] = question.id

            response.setJsonBody(json.dumps(question_data))
        finally:
            database_session.close()

        return state

    def addQuestion(self, state):
        (request, response, session) = state.unfold()

        database_session = self._database_session_maker()

        try:
            question_data = request.body
            question = Question()
            question.data = json.dumps(question_data)

            database_session.add(question)
            database_session.commit()

            question_data["id"] = question.id

            response.setJsonBody(json.dumps(question_data))

        finally:
            database_session.close()

        return state

    def saveQuestion(self, state, id):
        (request, response, session) = state.unfold()

        id = int(id)

        database_session = self._database_session_maker()

        try:
            question = database_session.query(Question).filter(Question.id==id).first()

            if not question:
                raise HttpNotFoundException()

            question_data = request.body
            del question_data["id"]
            question.data = json.dumps(question_data)
            question_data["id"] = question.id
            database_session.add(question)
            database_session.commit()

            response.setJsonBody(json.dumps(question_data))
        finally:
            database_session.close()

        return state

    def deleteQuestion(self, state, id):
        (request, response, session) = state.unfold()

        id = int(id)

        database_session = self._database_session_maker()

        try:
            database_session.query(Question).filter(Question.id==id).delete()
            database_session.commit()
        finally:
            database_session.close()

        return state

    def listQuestion(self, state):
        (request, response, session) = state.unfold()

        database_session = self._database_session_maker()

        try:
            questions = database_session.query(Question).order_by(Question.id).all()

            questions_data = []
            for question in questions:
                question_data = json.loads(question.data)
                question_data["id"] = question.id

                questions_data.append(question_data)

            response.setJsonBody(json.dumps(questions_data))

        finally:
            database_session.close()

        return state