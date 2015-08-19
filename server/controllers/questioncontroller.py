import json
import datetime
from contextlib import closing
from framework.httpexceptions import HttpNotFoundException
from framework.httpexceptions import HttpBadRequestException

from controllers.basecontroller import BaseController

from models.service.question import Question
from models.db.question import DbQuestion

class QuestionController(BaseController):

    def __init__(self):
        super().__init__()

    def getQuestion(self, state, id):
        (request, response, session) = state.unfold()

        try:
            id = int(id)
        except ValueError:
            raise HttpBadRequestException()

        with closing(self._database_session_maker()) as database_session:
            db_question = database_session.query(DbQuestion).filter(DbQuestion.id==id).first()

            if not db_question:
                raise HttpNotFoundException()

            question = Question.from_db(db_question)
            question_dict = question.to_dict()

            response.setJsonBody(json.dumps(question_dict))

        return state

    def addQuestion(self, state):
        (request, response, session) = state.unfold()

        with closing(self._database_session_maker()) as database_session:
            question_dict = request.body
            question = Question.from_dict(question_dict)
            db_question = question.to_db()

            database_session.add(db_question)
            database_session.commit()

            question = Question.from_db(db_question, question)
            question_dict = question.to_dict(question_dict)

            response.setJsonBody(json.dumps(question_dict))


        return state

    def saveQuestion(self, state, id):
        (request, response, session) = state.unfold()

        try:
            id = int(id)
        except ValueError:
            raise HttpBadRequestException()

        with closing(self._database_session_maker()) as database_session:
            db_question = database_session.query(DbQuestion).filter(DbQuestion.id==id).first()

            if not db_question:
                raise HttpNotFoundException()

            question_dict = request.body
            question = Question.from_dict(question_dict)
            db_question = question.to_db(db_question)

            database_session.add(db_question)
            database_session.commit()

            question = Question.from_db(db_question, question)
            question_dict = question.to_dict(question_dict)

            response.setJsonBody(json.dumps(question_dict))

        return state

    def deleteQuestion(self, state, id):
        (request, response, session) = state.unfold()

        try:
            id = int(id)
        except ValueError:
            raise HttpBadRequestException()

        with closing(self._database_session_maker()) as database_session:
            db_question = database_session.query(DbQuestion).filter(DbQuestion.id==id).first()

            if not db_question:
                raise HttpNotFoundException()
            database_session.delete(db_question)
            database_session.commit()

        return state

    def listQuestion(self, state):
        (request, response, session) = state.unfold()

        with closing(self._database_session_maker()) as database_session:
            db_questions = database_session.query(DbQuestion).order_by(DbQuestion.id).all()

            questions_data = []
            for db_question in db_questions:
                question_data = Question.from_db(db_question).to_dict()
                questions_data.append(question_data)

            response.setJsonBody(json.dumps(questions_data))

        return state