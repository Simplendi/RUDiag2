import datetime
from contextlib import closing
from framework import Config
from helpers.reviewer import Reviewer
from models.db.test import DbTest
from models.db.testsession import DbTestSession
from models.service.test import Test
from models.service.testsession import TestSession


class ReviewJob():

    def __init__(self):
        self._config = Config()
        self._database_session_maker = self._config['database_session_maker']


    def run(self):
        print("Running ReviewJob")
        with closing(self._database_session_maker()) as database_session:
            db_tests = database_session.query(DbTest).all()

            for db_test in db_tests:
                test = Test.from_db(db_test)
                if test.opened_at != None and test.review_method == Test.REVIEW_METHOD_AUTOMATIC:
                    reviewer = Reviewer()
                    reviewer.set_test(test)

                    db_test_sessions = database_session.query(DbTestSession)\
                        .filter(DbTestSession.test_id == test.id)\
                        .filter(DbTestSession.closed_at != None)\
                        .filter(DbTestSession.reviewed_at == None)\
                        .all()

                    for db_test_session in db_test_sessions:
                        test_session = TestSession.from_db(db_test_session)

                        test_session = reviewer.review(test_session)
                        test_session.reviewed_at = datetime.datetime.utcnow()

                        database_session.add(test_session.to_db(db_test_session))
                        database_session.commit()




        print("Completed ReviewJob")