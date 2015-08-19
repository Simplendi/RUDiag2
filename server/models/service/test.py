from models.db.test import DbTest

class Test:
    # Basic fields
    id = None
    title = ""
    owners = []
    shuffle_content = False
    content = []

    # Feedback fields
    default_feedback = {}
    default_feedback["0"] = ""
    default_feedback["1"] = ""
    group_feedback_by = ""
    total_feedback = []

    # Planning fields
    is_template = False
    open_at = None
    opened_at = None
    close_at = None
    closed_at = None
    invite_method = ""
    invite_url = ""
    check_method = "AUTOMATIC"
    check_anonymous = False
    ask_for_data = []

    @staticmethod
    def from_db(db_test, test = None):
        if not test:
            test = Test()

        test.id = db_test.id

        return test

    @staticmethod
    def from_dict(data_dict, test = None):
        if not test:
            test = Test()

        # Basic fields
        test.id = data_dict.get("id", None)
        test.title = data_dict.get("title", "")
        test.owners = data_dict.get("owners", [])
        test.shuffle_content = data_dict.get("shuffle_content", False)
        test.content = data_dict.get("content", [])

        # Feedback fields
        test.default_feedback = data_dict.get("default_feedback", {"0":"", "1":""})
        test.group_feedback_by = data_dict.get("group_feedback_by", "")
        test.total_feedback = data_dict.get("total_feedback", [])

        # Planning fields
        test.is_template = data_dict.get("is_template", False)
        test.open_at = data_dict.get("open_at")
        test.opened_at = data_dict.get("opened_at")
        test.close_at = data_dict.get("close_at")
        test.closed_at = data_dict.get("closed_at")
        test.invite_method = data_dict.get("invite_method", "")
        test.invite_url = data_dict.get("invite_url", "")
        test.check_method = data_dict.get("check_method", "AUTMOATIC")
        test.check_anonymous = data_dict.get("check_anonymous", False)
        test.ask_for_data = data_dict.get("ask_for_data", [])

        return test

    def to_db(self, db_test = None):
        if not db_test:
            db_test = DbTest()

        if self.id is not None:
            db_test.id = self.id

        return db_test

    def to_dict(self, data_dict = None):
        if not data_dict:
            data_dict = dict()

        # Basic fields
        if self.id is not None:
            data_dict["id"] = self.id
        data_dict["title"] = self.title
        data_dict["owners"] = self.owners
        data_dict["shuffle_content"] = self.shuffle_content
        data_dict["content"] = self.content

        # Feedback fields
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

        return data_dict

