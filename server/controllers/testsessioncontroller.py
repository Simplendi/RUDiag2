import traceback
from helpers.feedbacksender import FeedbackSender
import io
import json
import csv
import tempfile
from contextlib import closing
from controllers.genericcontroller import GenericController
from framework.httpexceptions import HttpBadRequestException, HttpNotFoundException, HttpUnauthorizedException
from helpers.invitesender import InviteSender
from models.db.test import DbTest
from models.db.testsession import DbTestSession
from models.service.test import Test
from models.service.testsession import TestSession


class TestSessionController(GenericController):

    def __init__(self):
        super().__init__(TestSession, DbTestSession, False)

    def _is_owner_or_reviewer(self, session, test):
        return self._get_user_id(session) is not None and (self._get_user_id(session) in test.owners or self._get_user_id(session) in test.reviewers)

    def _is_owner(self, session, test):
        return self._get_user_id(session) is not None and self._get_user_id(session) in test.owners

    def list(self, state):
        (request, response, session) = state.unfold()

        with closing(self._database_session_maker()) as database_session:
            try:
                test_id = int(request.query.get("test_id"))
            except:
                raise HttpBadRequestException()

            db_test = database_session.query(DbTest).get(test_id)

            if not db_test:
                raise HttpNotFoundException

            test = Test.from_db(db_test)

            if not self._is_owner_or_reviewer(session, test):
                raise HttpUnauthorizedException

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

            if not self._is_owner(session, test):
                raise HttpUnauthorizedException

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

    def export(self, state, test_id):
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

            if not self._is_owner(session, test):
                raise HttpUnauthorizedException

            if test.type == Test.TYPE_TREE:
                pass
            else:

                # Create temporary file and csv-writer to write csv in it.
                csv_file = tempfile.TemporaryFile(mode="w+", encoding = "utf-8")
                csv_writer = csv.writer(csv_file, delimiter=';', quoting=csv.QUOTE_NONNUMERIC)

                # Fill header
                header_row = []
                header_row.append("Student ID")
                header_row.append("Student Name")
                header_row.append("Student E-mail")
                header_row.append("Score")

                for (question_index, question) in enumerate([content["data"] for content in test.content if content["type"] == 'question']):
                    header_row.append("Question " + str(question_index + 1) + " right")
                    header_row.append("Question " + str(question_index + 1) + " answer")

                csv_writer.writerow(header_row)

                db_test_sessions = database_session.query(DbTestSession).filter(DbTestSession.test_id == test.id).all()

                for test_session in [TestSession.from_db(db_test_session) for db_test_session in db_test_sessions]:
                    row = []
                    row.append(test_session.student_id)
                    row.append(test_session.name)
                    row.append(test_session.email)
                    row.append(test_session.get_score())

                    for question_answer in test_session.question_feedback:
                        row.append(1 if question_answer["right"] else 0)
                        row.append(question_answer["answer"])

                    csv_writer.writerow(row)


                # Set Content Type
                response.content_type = "text/csv"

                # Set Content Disposition such that the file will be downloaded
                response.headers["Content-Disposition"] = "attachment; filename=" + str(test.id) + ".csv"

                csv_file.seek(0)
                response.body = csv_file.read()

                csv_file.close()


        return state



    def sendInvite(self, state, test_session_id):
        (request, response, session) = state.unfold()

        with closing(self._database_session_maker()) as database_session:
            db_test_session = database_session.query(DbTestSession).filter(DbTestSession.id==test_session_id).first()

            if not db_test_session:
                raise HttpNotFoundException()

            test_session = TestSession.from_db(db_test_session)

            db_test = database_session.query(DbTest).get(test_session.test_id)

            if not db_test:
                raise HttpNotFoundException

            test = Test.from_db(db_test)

            if not self._is_owner_or_reviewer(session, test):
                raise HttpUnauthorizedException

            if test_session.closed_at is not None or not test_session.email:
                raise HttpBadRequestException()

            try:
                invite_sender = InviteSender()
                invite_sender.sendInvite(database_session, test_session, db_test_session)
            except:
                print("Error while sending invite")
                traceback.print_exc()
                raise HttpBadRequestException()

        return state

    def sendFeedback(self, state, test_session_id):
        (request, response, session) = state.unfold()

        with closing(self._database_session_maker()) as database_session:
            db_test_session = database_session.query(DbTestSession).filter(DbTestSession.id==test_session_id).first()

            if not db_test_session:
                raise HttpNotFoundException()

            test_session = TestSession.from_db(db_test_session)

            db_test = database_session.query(DbTest).get(test_session.test_id)

            if not db_test:
                raise HttpNotFoundException

            test = Test.from_db(db_test)

            if not self._is_owner_or_reviewer(session, test):
                raise HttpUnauthorizedException

            if test_session.reviewed_at is None or not test_session.email:
                raise HttpBadRequestException()

            try:
                feedback_sender = FeedbackSender()
                feedback_sender.sendFeedback(database_session, test_session, db_test_session)
            except:
                print("Error while sending feedback")
                traceback.print_exc()
                raise HttpBadRequestException()

        return state

    def bindRoutes(self, router, path):
        super().bindRoutes(router, path)
        router.addMapping(r"^/" + path + "/([^/]+)/send_invite$", self.sendInvite, ['POST'])
        router.addMapping(r"^/" + path + "/([^/]+)/send_feedback$", self.sendFeedback, ['POST'])
        router.addMapping(r"^/" + path + "/([^/]+)/import$", self.import_from_file, ['POST'])
        router.addMapping(r"^/" + path + "/([^/]+)/export$", self.export, ['GET'])