import io
import json
import csv
from contextlib import closing
from controllers.genericcontroller import GenericController
from framework.httpexceptions import HttpBadRequestException, HttpNotFoundException
from helpers.invitesender import InviteSender
from models.db.test import DbTest
from models.db.testsession import DbTestSession
from models.service.test import Test
from models.service.testsession import TestSession


class TestSessionController(GenericController):

    def __init__(self):
        super().__init__(TestSession, DbTestSession, False)

    def list(self, state):
        (request, response, session) = state.unfold()

        with closing(self._database_session_maker()) as database_session:
            try:
                test_id = int(request.query.get("test_id"))
            except:
                raise HttpBadRequestException()

            db_objs = database_session.query(self.db_clazz).order_by(self.db_clazz.id).filter(self.db_clazz.test_id == test_id).all()

            obj_datas = []
            for db_obj in db_objs:
                obj_data = self.clazz.from_db(db_obj).to_dict()
                obj_datas.append(obj_data)

            response.setJsonBody(json.dumps(obj_datas))

        return state

    def import_from_file(self, state, test_id):
        (request, response, session) = state.unfold()

        with closing(self._database_session_maker()) as database_session:
            try:
                test_id = int(test_id)
            except:
                raise HttpBadRequestException()

            db_test = database_session.query(DbTest).filter(DbTest.id==test_id).first()

            if not db_test:
                raise HttpNotFoundException()

            test = Test.from_db(db_test)

            with io.TextIOWrapper(request.body["file"].file) as text_file:

                csv_reader = csv.reader(text_file, delimiter=";")
                # Skip first line
                next(csv_reader)
                for row in csv_reader:
                    test_session = TestSession()
                    test_session.test_id = test.id
                    if len(row) >=1:
                        test_session.email = row[0]
                    if len(row) >=2:
                        test_session.name = row[1]
                    if len(row) >=3:
                        test_session.student_id = row[2]

                    if len(row) >=1:
                        database_session.add(test_session.to_db())

                database_session.commit()

        return state


    def sendInvite(self, state, test_session_id):
        (request, response, session) = state.unfold()

        with closing(self._database_session_maker()) as database_session:
            db_test_session = database_session.query(DbTestSession).filter(DbTestSession.id==test_session_id).first()

            if not db_test_session:
                raise HttpNotFoundException()

            test_session = TestSession.from_db(db_test_session)

            if test_session.closed_at is not None or not test_session.email:
                raise HttpBadRequestException()

            try:
                invite_sender = InviteSender()
                invite_sender.sendInvite(database_session, test_session, db_test_session)
            except:
                raise HttpBadRequestException()

        return state

    def sendFeedback(self, state, test_session_id):
        (request, response, session) = state.unfold()

        with closing(self._database_session_maker()) as database_session:
            db_test_session = database_session.query(DbTestSession).filter(DbTestSession.id==test_session_id).first()

            if not db_test_session:
                raise HttpNotFoundException()

            test_session = TestSession.from_db(db_test_session)

            if test_session.reviewed_at is None or not test_session.email:
                raise HttpBadRequestException()

            #TODO: Send feedback

        return state

    def bindRoutes(self, router, path):
        super().bindRoutes(router, path)
        router.addMapping(r"^/" + path + "/([^/]+)/send_invite$", self.sendInvite, ['POST'])
        router.addMapping(r"^/" + path + "/([^/]+)/send_feedback$", self.sendFeedback, ['POST'])
        router.addMapping(r"^/" + path + "/([^/]+)/import$", self.import_from_file, ['POST'])