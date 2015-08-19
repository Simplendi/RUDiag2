import json
from models.db.question import DbQuestion

class Question:
    # Basic fields
    id = None
    type = ""
    owners = []
    metadata = {}
    content = {}
    default_feedback = {"0":"", "1":""}

    @staticmethod
    def from_db(db_question, question = None):
        if not question:
            question = Question()

        question.id = db_question.id
        question = Question.from_dict(json.loads(db_question.data), question)

        return question

    @staticmethod
    def from_dict(data_dict, question = None):
        if not question:
            question = Question()

        question.id = data_dict.get("id", question.id)
        question.type = data_dict.get("type", question.type)
        question.owners = data_dict.get("owners", question.owners)
        question.metadata = data_dict.get("metadata", question.metadata)
        question.content = data_dict.get("content", question.content)
        question.default_feedback = data_dict.get("default_feedback", question.default_feedback)

        return question

    def to_db(self, db_question = None):
        if not db_question:
            db_question = DbQuestion()

        if self.id is not None:
            db_question.id = self.id

        question_data = self.to_dict()
        if question_data.get("id"):
            del question_data["id"]
        db_question.data = json.dumps(question_data)

        return db_question

    def to_dict(self, data_dict = None):
        if not data_dict:
            data_dict = dict()

        # Basic fields
        if self.id is not None:
            data_dict["id"] = self.id

        data_dict["type"] = self.type
        data_dict["owners"] = self.owners
        data_dict["metadata"] = self.metadata
        data_dict["content"] = self.content
        data_dict["default_feedback"] = self.default_feedback

        return data_dict

