import json
import random
import string
import urllib
import datetime
from framework import Config
from models.db.testsession import DbTestSession
from helpers.parsedatetime import parse_datetime, stringify_datetime


class TestSession():

    def __init__(self):
        self.id = None
        self.test_id = None
        self.email = ""
        self.name = ""
        self.student_id = ""

        self.invited_at = None
        self.opened_at = None
        self.updated_at = None
        self.closed_at = None
        self.reviewed_at = None
        self.feedback_at = None

        self.answers = []
        self.question_feedback = []
        self.total_feedback = ""
        self.data = {}

    def generate_id(self, length=32):
        return ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(length))

    @staticmethod
    def get_new_session_for_test(test):
        test_session = TestSession()
        test_session.id = test_session.generate_id()
        test_session.test_id = test.id

        return test_session

    @staticmethod
    def from_db(db_test_session, test_session = None):
        if not test_session:
            test_session = TestSession()

        test_session.id = db_test_session.id
        test_session.test_id = db_test_session.test_id
        test_session.email = db_test_session.email
        test_session.name = db_test_session.name
        test_session.student_id = db_test_session.student_id
        test_session.invited_at = db_test_session.invited_at
        test_session.opened_at = db_test_session.opened_at
        test_session.updated_at = db_test_session.updated_at
        test_session.closed_at = db_test_session.closed_at
        test_session.reviewed_at = db_test_session.reviewed_at
        test_session.feedback_at = db_test_session.feedback_at
        test_session = TestSession.from_db_dict(json.loads(db_test_session.data), test_session)

        return  test_session

    @staticmethod
    def from_dict(data_dict, test_session = None):
        if not test_session:
            test_session = TestSession()

        test_session.id = data_dict.get('id', test_session.id)
        test_session.test_id = data_dict.get('test_id', test_session.test_id)
        test_session.email = data_dict.get('email', test_session.email)
        test_session.name = data_dict.get('name', test_session.name)
        test_session.student_id = data_dict.get('student_id', test_session.student_id)
        test_session.invited_at = parse_datetime(data_dict.get('invited_at'))
        test_session.opened_at = parse_datetime(data_dict.get('opened_at'))
        test_session.updated_at = parse_datetime(data_dict.get('updated_at'))
        test_session.closed_at = parse_datetime(data_dict.get('closed_at'))
        test_session.reviewed_at = parse_datetime(data_dict.get('reviewed_at'))
        test_session.feedback_at = parse_datetime(data_dict.get('feedback_at'))
        test_session.answers = data_dict.get("answers", test_session.answers)
        test_session.question_feedback = data_dict.get("question_feedback", test_session.question_feedback)
        test_session.total_feedback = data_dict.get("total_feedback", test_session.total_feedback)
        test_session.data = data_dict.get("data", test_session.data)

        return test_session

    @staticmethod
    def from_db_dict(data_dict, test_session):
        test_session.answers = data_dict.get("answers", test_session.answers)
        test_session.question_feedback = data_dict.get("question_feedback", test_session.question_feedback)
        test_session.total_feedback = data_dict.get("total_feedback", test_session.total_feedback)
        test_session.data = data_dict.get("data", test_session.data)

        return test_session


    def to_db(self, db_test_session = None):
        if not db_test_session:
            db_test_session = DbTestSession()

        if not self.id:
            self.id = self.generate_id()
        db_test_session.id = self.id
        db_test_session.test_id = self.test_id
        db_test_session.email = self.email
        db_test_session.name = self.name
        db_test_session.student_id = self.student_id
        db_test_session.invited_at = self.invited_at
        db_test_session.opened_at = self.opened_at
        db_test_session.updated_at = self.updated_at
        db_test_session.closed_at = self.closed_at
        db_test_session.reviewed_at = self.reviewed_at
        db_test_session.feedback_at = self.feedback_at
        db_test_session.data = json.dumps(self.to_db_dict())

        return db_test_session

    def to_db_dict(self):
        data_dict = dict()
        data_dict["answers"] = self.answers
        data_dict["question_feedback"] = self.question_feedback
        data_dict["total_feedback"] = self.total_feedback
        data_dict["data"] = self.data

        return data_dict

    def to_dict(self, data_dict = None):
        if not data_dict:
            data_dict = dict()

        data_dict["id"] = self.id
        data_dict["test_id"] = self.test_id
        data_dict["email"] = self.email
        data_dict["name"] = self.name
        data_dict["student_id"] = self.student_id
        data_dict["invited_at"] = stringify_datetime(self.invited_at)
        data_dict["opened_at"] = stringify_datetime(self.opened_at)
        data_dict["updated_at"] = stringify_datetime(self.updated_at)
        data_dict["closed_at"] = stringify_datetime(self.closed_at)
        data_dict["reviewed_at"] = stringify_datetime(self.reviewed_at)
        data_dict["feedback_at"] = stringify_datetime(self.feedback_at)
        data_dict["answers"] = self.answers
        data_dict["question_feedback"] = self.question_feedback
        data_dict["total_feedback"] = self.total_feedback
        data_dict["data"] = self.data

        data_dict["invite_url"] = self.get_invite_url()

        return data_dict

    def get_score(self):
        return sum([1 if question["right"] else 0 for question in self.question_feedback])

    def get_invite_url(self):
        return Config()["absolute_url"] + "index.html#/answer/" + urllib.parse.quote_plus(self.id)