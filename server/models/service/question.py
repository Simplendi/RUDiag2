import json
from models.db.question import DbQuestion


class Question:
    def __init__(self):
        # Basic fields
        self.id = None
        self.type = ""
        self.owners = []
        self.metadata = {}
        self.content = {}
        self.answers = []
        self.feedback = {"wrong": "", "right": ""}

        self.created = None
        self.last_saved = None

    @staticmethod
    def from_db(db_question, question=None):
        if not question:
            question = Question()

        question.id = db_question.id
        question = Question.from_dict(json.loads(db_question.data), question)
        question.created = db_question.created
        question.last_saved = db_question.last_saved

        return question

    @staticmethod
    def from_dict(data_dict, question=None):
        if not question:
            question = Question()

        question.id = data_dict.get("id", question.id)
        question.type = data_dict.get("type", question.type)
        question.owners = data_dict.get("owners", question.owners)
        question.metadata = data_dict.get("metadata", question.metadata)
        question.content = data_dict.get("content", question.content)
        question.answers = data_dict.get("answers", question.answers)
        question.feedback = data_dict.get("feedback", question.feedback)

        return question

    def to_db(self, db_question=None):
        if not db_question:
            db_question = DbQuestion()

        if self.id is not None:
            db_question.id = self.id

        db_question.data = json.dumps(self.to_dict(for_db=True))

        return db_question

    def to_dict(self, data_dict=None, for_db=False):
        if not data_dict:
            data_dict = dict()

        # Basic fields
        if self.id is not None and not for_db:
            data_dict["id"] = self.id

        data_dict["type"] = self.type
        data_dict["owners"] = self.owners
        data_dict["metadata"] = self.metadata
        data_dict["content"] = self.content
        data_dict["answers"] = self.answers
        data_dict["feedback"] = self.feedback

        if not for_db:
            data_dict["created"] = self.created.isoformat()
            data_dict["last_saved"] = self.last_saved.isoformat()

        return data_dict

    def is_right_answer(self, answer):
        if self.type in ['choice', 'multiplechoice', 'open']:
            return answer in self.answers
