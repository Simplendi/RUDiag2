import datetime
from framework import Config
from helpers.feedbackemail import FeedbackEmail
from helpers.inviteemail import InviteEmail
from models.db.test import DbTest
from models.db.user import DbUser
from models.service.test import Test
from models.service.testsession import TestSession
from models.service.user import User


class FeedbackSender():


    def sendFeedback(self, database_session, test_session, db_test_session=None, test=None):
        if not test:
            db_test = database_session.query(DbTest).filter(DbTest.id == test_session.test_id).first()
            test = Test.from_db(db_test)

        if test.sender_email:
            sender_email = test.sender_email
        else:
            sender_email = Config()["sender_emailaddress"]

        test_session.feedback_at = datetime.datetime.utcnow()
        feedback_email = FeedbackEmail(sender_email, test_session.email, test_session, test)
        feedback_email.send()

        database_session.add(test_session.to_db(db_test_session))
        database_session.commit()