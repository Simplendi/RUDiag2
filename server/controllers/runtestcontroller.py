import json
import traceback
import hashlib
import datetime
from contextlib import closing
from framework.httpexceptions import HttpNotFoundException
from framework.httpexceptions import HttpBadRequestException

from controllers.basecontroller import BaseController
from helpers.inviteemail import InviteEmail
from helpers.invitesender import InviteSender
from models.db.test import DbTest
from models.db.testsession import DbTestSession
from models.db.user import DbUser

from models.service.question import Question
from models.db.question import DbQuestion
from models.service.test import Test
from models.service.testsession import TestSession
from models.service.user import User


class RunTestController(BaseController):
    def __init__(self):
        super().__init__()

    def _getOpenTestOrThrowHttp(self, database_session, test_id):
        db_test = database_session.query(DbTest).filter(DbTest.id == test_id).first()

        if not db_test:
            raise HttpNotFoundException()

        test = Test.from_db(db_test)

        if test.opened_at is None:
            raise HttpNotFoundException()

        return test

    def getTestInfo(self, state, id):
        (request, response, session) = state.unfold()

        try:
            id = int(id)
        except ValueError:
            raise HttpBadRequestException()

        with closing(self._database_session_maker()) as database_session:
            test = self._getOpenTestOrThrowHttp(database_session, id)

            response.setJsonBody(json.dumps(test.to_info_dict()))
            return state

    def getTestUsingSession(self, state, id):
        (request, response, session) = state.unfold()

        with closing(self._database_session_maker()) as database_session:
            db_test_session = database_session.query(DbTestSession).filter(DbTestSession.id == id).first()

            if not db_test_session:
                raise HttpNotFoundException()

            test_session = TestSession.from_db(db_test_session)

            test = self._getOpenTestOrThrowHttp(database_session, test_session.test_id)

            response.setJsonBody(json.dumps(test.to_run_dict()))
            return state

    def getTestSession(self, state, id):
        (request, response, session) = state.unfold()

        with closing(self._database_session_maker()) as database_session:
            db_test_session = database_session.query(DbTestSession).filter(DbTestSession.id == id).first()

            if not db_test_session:
                raise HttpNotFoundException()

            test_session = TestSession.from_db(db_test_session)
            if not test_session.opened_at:
                test_session.opened_at = datetime.datetime.utcnow()

            database_session.add(test_session.to_db(db_test_session))
            database_session.commit()

            response.setJsonBody(json.dumps(test_session.to_dict()))
            return state

    def closeTestSession(self, state, id):
        (request, response, session) = state.unfold()

        with closing(self._database_session_maker()) as database_session:
            db_test_session = database_session.query(DbTestSession).filter(DbTestSession.id == id).first()

            if not db_test_session:
                raise HttpNotFoundException()

            test_session = TestSession.from_db(db_test_session)
            test_session = TestSession.from_dict(request.body, test_session)
            test_session.updated_at = datetime.datetime.utcnow()
            test_session.closed_at = datetime.datetime.utcnow()

            database_session.add(test_session.to_db(db_test_session))
            database_session.commit()

            response.setJsonBody(json.dumps(test_session.to_dict()))
            return state

    def updateTestSession(self, state, id):
        (request, response, session) = state.unfold()

        with closing(self._database_session_maker()) as database_session:
            db_test_session = database_session.query(DbTestSession).filter(DbTestSession.id == id).first()

            if not db_test_session:
                raise HttpNotFoundException()

            test_session = TestSession.from_db(db_test_session)

            if test_session.closed_at:
                raise HttpBadRequestException()

            test_session = TestSession.from_dict(request.body, test_session)
            test_session.updated_at = datetime.datetime.utcnow()

            database_session.add(test_session.to_db(db_test_session))
            database_session.commit()

            response.setJsonBody(json.dumps(test_session.to_dict()))
            return state

    def requestTestInvite(self, state, id):
        (request, response, session) = state.unfold()

        try:
            id = int(id)
        except ValueError:
            raise HttpBadRequestException()

        with closing(self._database_session_maker()) as database_session:
            test = self._getOpenTestOrThrowHttp(database_session, id)

            if test.invite_method != Test.INVITE_METHOD_LINK:
                raise HttpNotFoundException()

            if not request.body.get("email", ""):
                response.statuscode = 400
                response.setJsonBody(json.dumps({'error':'invalid'}))
                return state


            test_session = TestSession.get_new_session_for_test(test)
            test_session.email = request.body.get("email", "")

            try:
                invite_sender = InviteSender()
                invite_sender.sendInvite(database_session, test_session, test=test)
            except:
                print("Error while sending invite")
                traceback.print_exc()
                response.statuscode = 400
                response.setJsonBody(json.dumps({'error':'mail'}))

            return state

    def bindRoutes(self, router):
        router.addMapping(r"^/run/test_session/([^/]+)/close", self.closeTestSession, ['POST'])
        router.addMapping(r"^/run/test_session/([^/]+)/test", self.getTestUsingSession, ['GET'])
        router.addMapping(r"^/run/test_session/([^/]+)", self.getTestSession, ['GET'])
        router.addMapping(r"^/run/test_session/([^/]+)", self.updateTestSession, ['POST'])
        router.addMapping(r"^/run/test/([0-9]+)/invite$", self.requestTestInvite, ['POST'])
        router.addMapping(r"^/run/test/([0-9]+)/info$", self.getTestInfo, ['GET'])
