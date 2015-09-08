import datetime
from contextlib import closing
from framework import Config
from helpers.feedbacksender import FeedbackSender
from helpers.invitesender import InviteSender
from models.db.test import DbTest
from models.db.testsession import DbTestSession
from models.service.test import Test
from models.service.testsession import TestSession


class FeedbackJob():
    def __init__(self):
        self._config = Config()
        self._database_session_maker = self._config['database_session_maker']

    def run(self):
        print("Running FeedbackJob")
        with closing(self._database_session_maker()) as database_session:
            db_tests = database_session.query(DbTest).all()

            for db_test in db_tests:
                test = Test.from_db(db_test)
                if test.opened_at is not None and \
                        ((test.feedback_timing == Test.FEEDBACK_TIMING_AT
                          and test.feedback_at is not None
                          and test.feedback_at.time() < datetime.datetime.utcnow().time())
                         or
                             (test.feedback_timing == Test.FEEDBACK_TIMING_AFTER)):

                    db_test_sessions = database_session.query(DbTestSession) \
                        .filter(DbTestSession.test_id == test.id) \
                        .filter(DbTestSession.closed_at != None) \
                        .all()

                    for db_test_session in db_test_sessions:
                        test_session = TestSession.from_db(db_test_session)

                        if test_session.feedback_at is not None:
                            continue

                        if test.feedback_timing == Test.FEEDBACK_TIMING_AFTER:
                            if test_session.closed_at and (
                                datetime.datetime.utcnow() - test_session.closed_at).seconds / 60 < test.feedback_after:
                                continue

                        try:
                            feedback_sender = FeedbackSender()
                            feedback_sender.sendFeedback(database_session, test_session,
                                                         db_test_session=db_test_session, test=test)
                        except:
                            print("Error while sending mail to {}".format(test_session.email))

        print("Completed FeedbackJob")
