import datetime
from contextlib import closing
from framework import Config
from models.db.test import DbTest
from models.service.test import Test


class TimerJob():

    def __init__(self):
        self._config = Config()
        self._database_session_maker = self._config['database_session_maker']


    def run(self):
        print("Running TimerJob")
        with closing(self._database_session_maker()) as database_session:
            db_tests = database_session.query(DbTest).all()

            for db_test in db_tests:
                test = Test.from_db(db_test)

                # Skip template tests
                if test.is_template:
                    continue

                # Open tests that should be opened
                if test.open_at and test.open_at < datetime.datetime.utcnow() and test.opened_at is None:
                    test.opened_at = datetime.datetime.utcnow()
                    print("Opened test {} (id={}) at {}".format(test.title, test.id, test.opened_at))
                    database_session.add(test.to_db(db_test))

                # Close tests that should be closed
                if test.close_at and test.close_at < datetime.datetime.utcnow() and test.closed_at is None:
                    test.closed_at = datetime.datetime.utcnow()
                    print("Closed test {} (id={}) at {}".format(test.title, test.id, test.closed_at))
                    database_session.add(test.to_db(db_test))

                database_session.commit()

        print("Completed TimerJob")
