import json
from models.db.test import DbTest

class Test:

    def __init__(self):
        # Basic fields
        self.id = None
        self.title = ""
        self.owners = []
        self.shuffle_content = False
        self.content = []

        # Feedback fields
        self.question_feedback = []
        self.default_feedback = {}
        self.default_feedback["wrong"] = ""
        self.default_feedback["right"] = ""
        self.group_feedback_by = ""
        self.total_feedback = []

        # Planning fields
        self.is_template = False
        self.open_at = None
        self.opened_at = None
        self.close_at = None
        self.closed_at = None
        self.feedback_at = None
        self.feedback_after = None
        self.invite_method = ""
        self.invite_url = ""
        self.check_method = "AUTOMATIC"
        self.check_anonymous = False
        self.ask_for_data = []

        self.created = None
        self.last_saved = None

    @staticmethod
    def from_db(db_test, test = None):
        if not test:
            test = Test()

        test.id = db_test.id
        Test.from_dict(json.loads(db_test.data), test)
        test.created = db_test.created
        test.last_saved = db_test.last_saved

        return test

    @staticmethod
    def from_dict(data_dict, test = None):
        if not test:
            test = Test()

        # Basic fields
        test.id = data_dict.get("id", test.id)
        test.title = data_dict.get("title", test.title)
        test.owners = data_dict.get("owners", test.owners)
        test.shuffle_content = data_dict.get("shuffle_content", test.shuffle_content)
        test.content = data_dict.get("content", test.content)

        # Feedback fields
        test.question_feedback = data_dict.get("question_feedback", test.question_feedback)
        test.default_feedback = data_dict.get("default_feedback", test.default_feedback)
        test.group_feedback_by = data_dict.get("group_feedback_by", test.group_feedback_by)
        test.total_feedback = data_dict.get("total_feedback", test.total_feedback)

        # Planning fields
        test.is_template = data_dict.get("is_template", test.is_template)
        test.open_at = data_dict.get("open_at", test.open_at)
        test.opened_at = data_dict.get("opened_at", test.opened_at)
        test.close_at = data_dict.get("close_at", test.close_at)
        test.closed_at = data_dict.get("closed_at", test.closed_at)
        test.invite_method = data_dict.get("invite_method", test.invite_method)
        test.invite_url = data_dict.get("invite_url", test.invite_url)
        test.check_method = data_dict.get("check_method", test.check_method)
        test.check_anonymous = data_dict.get("check_anonymous", test.check_anonymous)
        test.ask_for_data = data_dict.get("ask_for_data", test.ask_for_data)

        return test

    def to_db(self, db_test = None):
        if not db_test:
            db_test = DbTest()

        if self.id is not None:
            db_test.id = self.id

        db_test.data = json.dumps(self.to_dict(for_db=True))

        return db_test

    def to_dict(self, data_dict = None, for_db = False):
        if not data_dict:
            data_dict = dict()

        # Basic fields
        if self.id is not None and not for_db:
            data_dict["id"] = self.id
        data_dict["title"] = self.title
        data_dict["owners"] = self.owners
        data_dict["shuffle_content"] = self.shuffle_content
        data_dict["content"] = self.content

        # Feedback fields
        data_dict["question_feedback"] = self.question_feedback
        data_dict["default_feedback"] = self.default_feedback
        data_dict["group_feedback_by"] = self.group_feedback_by
        data_dict["total_feedback"] = self.total_feedback

        # Planning fields
        data_dict["is_template"] = self.is_template
        data_dict["open_at"] = self.open_at
        data_dict["opened_at"] = self.opened_at
        data_dict["close_at"] = self.close_at
        data_dict["closed_at"] = self.closed_at
        data_dict["invite_method"] = self.invite_method
        data_dict["invite_url"] = self.invite_url
        data_dict["check_method"] = self.check_method
        data_dict["check_anonymous"] = self.check_anonymous
        data_dict["ask_for_data"] = self.ask_for_data

        if not for_db:
            data_dict["created"] = self.created.isoformat()
            data_dict["last_saved"] = self.last_saved.isoformat()

        return data_dict

