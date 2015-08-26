# Do not remove this import as it is actually used
import config
config = config




from models.db.question import DbQuestion
from models.db.test import DbTest
from models.db.user import DbUser
from models.db.metadata import DbMetadata
from models.service.question import Question
from models.service.test import Test
from models.service.user import User
from models.service.metadata import Metadata

from framework.application import Application
from framework.router import Router
from framework.config import Config

from helpers.sessionrepository import SessionRepository

from controllers.logincontroller import LoginController
from controllers.genericcontroller import GenericController
from controllers.usercontroller import UserController

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

        question_controller = GenericController(Question, DbQuestion)
        question_controller.bindRoutes(self.router, "question")

        test_controller = GenericController(Test, DbTest)
        test_controller.bindRoutes(self.router, "test")

        user_controller = UserController()
        user_controller.bindRoutes(self.router, "user")

        metadata_controller = GenericController(Metadata, DbMetadata)
        metadata_controller.bindRoutes (self.router, "metadata")

        self.router.addStaticMapping(r"^/admin/static/", "../adminClient/dist")
        self.router.addStaticMapping(r"^/admin/", "../adminClient/dist")


app = App()
wsgi = app.getWsgi()

if __name__ == "__main__":
    print("Serving application at http://localhost:8000")
    app.serve()