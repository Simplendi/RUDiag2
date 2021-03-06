# Do not remove this import as it is actually used
import config
from controllers.imagecontroller import ImageController

config = config

from models.db.question import DbQuestion
from models.db.test import DbTest
from models.db.user import DbUser
from models.db.testsession import DbTestSession
from models.db.metadata import DbMetadata
from models.service.question import Question
from models.service.test import Test
from models.service.user import User
from models.service.metadata import Metadata
from models.service.testsession import TestSession

from framework.application import Application
from framework.router import Router
from framework.config import Config

from helpers.sessionrepository import SessionRepository

from controllers.logincontroller import LoginController
from controllers.genericcontroller import GenericController
from controllers.usercontroller import UserController
from controllers.runtestcontroller import RunTestController
from controllers.testsessioncontroller import TestSessionController
from controllers.testcontroller import TestController
from controllers.questioncontroller import QuestionController
from controllers.metadatacontroller import MetadataController

class App(Application):
    def __init__(self):
        super().__init__()

        self.router = Router()
        self.controller = self.router
        self.config = Config()
        self._session_repository = SessionRepository()

        login_controller = LoginController()
        self.router.addMapping(r"^/login$", login_controller.doLogin, ["POST"])
        self.router.addMapping(r"^/logout", login_controller.doLogout, ["POST"])
        self.router.addMapping(r"^/login$", login_controller.getLogin, ["GET"])

        question_controller = QuestionController()
        question_controller.bindRoutes(self.router, "question")

        test_controller = TestController()
        test_controller.bindRoutes(self.router, "test")

        user_controller = UserController()
        user_controller.bindRoutes(self.router, "user")

        metadata_controller = MetadataController()
        metadata_controller.bindRoutes (self.router, "metadata")

        test_session_controller = TestSessionController()
        test_session_controller.bindRoutes(self.router, "test_session")

        image_controller = ImageController()
        image_controller.bindRoutes(self.router)

        self.router.addStaticMapping(r"^/image/", self.config["upload_folder"])

        self.router.addStaticMapping(r"^/admin/static/", "../adminClient/dist")
        self.router.addStaticMapping(r"^/admin/", self.config["base_path"] + "/adminClient/dist")

        run_test_controller = RunTestController()
        run_test_controller.bindRoutes(self.router)

        self.router.addStaticMapping(r"^/static/", "../client/dist")
        self.router.addStaticMapping(r"^/", self.config["base_path"] + "/client/dist")


app = App()
wsgi = app.getWsgi()

if __name__ == "__main__":
    print("Serving application at http://localhost:8000")
    app.serve()