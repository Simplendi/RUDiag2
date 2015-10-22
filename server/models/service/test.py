import json
import urllib
import datetime
from framework import Config
from models.db.test import DbTest
from helpers.parsedatetime import parse_datetime, stringify_datetime


class Test:
    REVIEW_METHOD_AUTOMATIC = "automatic"
    REVIEW_METHOD_MANUAL = "manual"

    FEEDBACK_TIMING_NEVER = "never"
    FEEDBACK_TIMING_AT = "at"
    FEEDBACK_TIMING_AFTER = "after"

    REVIEW_TIMING_NEVER = "never"
    REVIEW_TIMING_ANSWER = "answer"
    REVIEW_TIMING_FEEDBACK = "feedback"

    INVITE_METHOD_LINK = "link"
    INVITE_METHOD_EMAIL = "email"
    INVITE_METHOD_CODE = "code"
    INVITE_METHOD_LOGIN = "login"
    INVITE_METHOD_SECURE = "secure"

    TYPE_BASIC = "basic"
    TYPE_TREE = "tree"

    def __init__(self):
        # Basic fields
        self.id = None
        self.type = Test.TYPE_BASIC
        self.title = ""
        self.owners = []
        self.reviewers = []
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
        self.feedback_timing = Test.FEEDBACK_TIMING_NEVER
        self.feedback_at = None
        self.feedback_after = None
        self.invite_method = Test.INVITE_METHOD_LINK
        self.invite_url = ""
        self.review_timing = Test.REVIEW_TIMING_FEEDBACK
        self.review_method = Test.REVIEW_METHOD_AUTOMATIC
        self.review_anonymous = False
        self.sender_email = ""
        self.extra_data_label = ""
        self.extra_data_options = []

        self.created = None
        self.last_saved = None

    @staticmethod
    def from_db(db_test, test=None):
        if not test:
            test = Test()

        test.id = db_test.id
        Test.from_dict(json.loads(db_test.data), test)
        test.created = db_test.created
        test.last_saved = db_test.last_saved

        return test

    @staticmethod
    def from_dict(data_dict, test=None):
        if not test:
            test = Test()

        # Basic fields
        test.id = data_dict.get("id", test.id)
        test.type = data_dict.get("type", test.type)
        test.title = data_dict.get("title", test.title)
        test.owners = data_dict.get("owners", test.owners)
        test.reviewers = data_dict.get("reviewers", test.reviewers)
        test.shuffle_content = data_dict.get("shuffle_content", test.shuffle_content)
        test.content = data_dict.get("content", test.content)
        test.sender_email = data_dict.get("sender_email", test.sender_email)

        # Feedback fields
        test.question_feedback = data_dict.get("question_feedback", test.question_feedback)
        test.default_feedback = data_dict.get("default_feedback", test.default_feedback)
        test.group_feedback_by = data_dict.get("group_feedback_by", test.group_feedback_by)
        test.total_feedback = data_dict.get("total_feedback", test.total_feedback)

        # Planning fields
        test.is_template = data_dict.get("is_template", test.is_template)
        test.open_at = parse_datetime(data_dict.get("open_at", test.open_at))
        test.opened_at = parse_datetime(data_dict.get("opened_at", test.opened_at))
        test.close_at = parse_datetime(data_dict.get("close_at", test.close_at))
        test.closed_at = parse_datetime(data_dict.get("closed_at", test.closed_at))
        test.feedback_timing = data_dict.get("feedback_timing", test.feedback_timing)
        test.feedback_at = parse_datetime(data_dict.get("feedback_at", test.feedback_at))
        test.feedback_after = data_dict.get("feedback_after", test.feedback_after)
        test.invite_method = data_dict.get("invite_method", test.invite_method)
        test.review_timing = data_dict.get("review_timing", test.review_timing)
        test.review_method = data_dict.get("review_method", test.review_method)
        test.review_anonymous = data_dict.get("review_anonymous", test.review_anonymous)
        test.extra_data_label = data_dict.get("extra_data_label", test.extra_data_label)
        test.extra_data_options = data_dict.get("extra_data_options", test.extra_data_options)

        return test

    def _get_question_for_run(self, item_dict):
        question_dict = item_dict["data"]
        new_question_dict = dict()
        new_question_dict["type"] = question_dict["type"]
        new_question_dict["content"] = question_dict["content"]

        item_dict["data"] = new_question_dict

        return item_dict

    def _get_question_for_feedback(self, item_dict):
        question_dict = item_dict["data"]
        new_question_dict = dict()
        new_question_dict["type"] = question_dict["type"]
        new_question_dict["content"] = question_dict["content"]
        new_question_dict["answers"] = question_dict["answers"]

        item_dict["data"] = new_question_dict

        return item_dict

    def to_feedback_dict(self):
        data_dict = dict()
        data_dict["title"] = self.title
        data_dict["type"] = self.type
        data_dict["shuffle_content"] = self.shuffle_content

        # Strip content of sensitive details
        if self.type == Test.TYPE_BASIC:
            content = []
            for item in self.content:
                if item["type"] == "question":
                    content.append(self._get_question_for_feedback(item))
                else:
                    content.append(item)
            data_dict["content"] = content
        else:
            data_dict["content"] = self.content

        data_dict["opened_at"] = stringify_datetime(self.opened_at)
        data_dict["close_at"] = stringify_datetime(self.close_at)
        data_dict["closed_at"] = stringify_datetime(self.closed_at)
        data_dict["feedback_timing"] = self.feedback_timing
        data_dict["feedback_at"] = stringify_datetime(self.feedback_at)
        data_dict["feedback_after"] = self.feedback_after
        data_dict["review_timing"] = self.review_timing
        data_dict["invite_method"] = self.invite_method
        data_dict["invite_url"] = self.get_invite_url()
        data_dict["extra_data_label"] = self.extra_data_label
        data_dict["extra_data_options"] = self.extra_data_options

        return data_dict

    def to_run_dict(self):
        data_dict = dict()
        data_dict["title"] = self.title
        data_dict["type"] = self.type
        data_dict["shuffle_content"] = self.shuffle_content

        # Strip content of sensitive details
        if self.type == Test.TYPE_BASIC:
            content = []
            for item in self.content:
                if item["type"] == "question":
                    content.append(self._get_question_for_run(item))
                else:
                    content.append(item)
            data_dict["content"] = content
        else:
            data_dict["content"] = self.content

        data_dict["opened_at"] = stringify_datetime(self.opened_at)
        data_dict["close_at"] = stringify_datetime(self.close_at)
        data_dict["closed_at"] = stringify_datetime(self.closed_at)
        data_dict["feedback_timing"] = self.feedback_timing
        data_dict["feedback_at"] = stringify_datetime(self.feedback_at)
        data_dict["feedback_after"] = self.feedback_after
        data_dict["review_timing"] = self.review_timing
        data_dict["invite_method"] = self.invite_method
        data_dict["invite_url"] = self.get_invite_url()
        data_dict["extra_data_label"] = self.extra_data_label
        data_dict["extra_data_options"] = self.extra_data_options

        return data_dict

    def to_info_dict(self):
        data_dict = dict()

        data_dict["title"] = self.title
        data_dict["type"] = self.type
        data_dict["shuffle_content"] = self.shuffle_content
        data_dict["opened_at"] = stringify_datetime(self.opened_at)
        data_dict["close_at"] = stringify_datetime(self.close_at)
        data_dict["closed_at"] = stringify_datetime(self.closed_at)
        data_dict["feedback_timing"] = self.feedback_timing
        data_dict["feedback_at"] = stringify_datetime(self.feedback_at)
        data_dict["feedback_after"] = self.feedback_after
        data_dict["review_timing"] = self.review_timing
        data_dict["invite_method"] = self.invite_method
        data_dict["invite_url"] = self.get_invite_url()
        data_dict["extra_data_label"] = self.extra_data_label
        data_dict["extra_data_options"] = self.extra_data_options

        return data_dict

    def to_db(self, db_test=None):
        if not db_test:
            db_test = DbTest()

        if self.id is not None:
            db_test.id = self.id

        db_test.data = json.dumps(self.to_dict(for_db=True))

        return db_test

    def to_dict(self, data_dict=None, for_db=False):
        if not data_dict:
            data_dict = dict()

        # Basic fields
        if self.id is not None and not for_db:
            data_dict["id"] = self.id

        data_dict["type"] = self.type
        data_dict["title"] = self.title
        data_dict["owners"] = self.owners
        data_dict["reviewers"] = self.reviewers
        data_dict["shuffle_content"] = self.shuffle_content
        data_dict["content"] = self.content
        data_dict["sender_email"] = self.sender_email

        # Feedback fields
        data_dict["question_feedback"] = self.question_feedback
        data_dict["default_feedback"] = self.default_feedback
        data_dict["group_feedback_by"] = self.group_feedback_by
        data_dict["total_feedback"] = self.total_feedback

        # Planning fields
        data_dict["is_template"] = self.is_template
        data_dict["open_at"] = stringify_datetime(self.open_at)
        data_dict["opened_at"] = stringify_datetime(self.opened_at)
        data_dict["close_at"] = stringify_datetime(self.close_at)
        data_dict["closed_at"] = stringify_datetime(self.closed_at)
        data_dict["feedback_timing"] = self.feedback_timing
        data_dict["feedback_at"] = stringify_datetime(self.feedback_at)
        data_dict["feedback_after"] = self.feedback_after
        data_dict["invite_method"] = self.invite_method
        if not for_db:
            data_dict["invite_url"] = self.get_invite_url()

        data_dict["review_timing"] = self.review_timing
        data_dict["review_method"] = self.review_method
        data_dict["review_anonymous"] = self.review_anonymous
        data_dict["extra_data_label"] = self.extra_data_label
        data_dict["extra_data_options"] = self.extra_data_options

        if not for_db:
            data_dict["created"] = self.created.isoformat()
            data_dict["last_saved"] = self.last_saved.isoformat()

        return data_dict

    def get_invite_url(self):
        return Config()["absolute_url"] + "index.html#/test/" + str(self.id) + "/" + urllib.parse.quote_plus(self.title)

    def get_node(self, path):
        if self.type != Test.TYPE_TREE:
            return None

        current_array = self.content
        path_elements = path.split(".")
        path_element_index = 0
        while path_element_index < len(path_elements):
            path_element = path_elements[path_element_index]
            try:
                path_index = int(path_element)-1
            except:
                return None

            if len(current_array) > path_index:
                if path_element_index == len(path_elements)-1:
                    return current_array[path_index]
                else:
                    try:
                        option_index = int(path_elements[path_element_index+1])-1
                    except:
                        return None

                    if len(current_array[path_index]["children"]) > option_index:
                        current_array = current_array[path_index]["children"][option_index]
                        path_element_index+=2
                    else:
                        return None

            else:
                return None


    @staticmethod
    def cmp_path(x_path, y_path):
        x_path_elements = x_path.split(".")
        y_path_elements = y_path.split(".")

        path_elements = zip(x_path_elements, y_path_elements)

        for (x_element, y_element) in path_elements:
            try:
                x_element = int(x_element)
                y_element = int(y_element)

                if x_element < y_element:
                    return -1
                elif x_element == y_element:
                    continue
                elif x_element > y_element:
                    return 1
            except:
                return -1

        return 0


