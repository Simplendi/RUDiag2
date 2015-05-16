# Do not remove this import as it is actually used
import config
config = config

from framework.application import Application
from framework.router import Router
from framework.config import Config

from helpers.sessionrepository import SessionRepository

from controllers.logincontroller import LoginController
from controllers.questioncontroller import QuestionController
from controllers.testcontroller import TestController
from controllers.usercontroller import UserController
from controllers.runtestcontroller import RunTestController
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
        self.router.addMapping(r"^/question/([^/]+)$", question_controller.getQuestion, ['GET'])
        self.router.addMapping(r"^/question/([^/]+)$", question_controller.saveQuestion, ['POST'])
        self.router.addMapping(r"^/question/([^/]+)$", question_controller.deleteQuestion, ['DELETE'])
        self.router.addMapping(r"^/question/$", question_controller.addQuestion, ['PUT'])
        self.router.addMapping(r"^/question/$", question_controller.listQuestion, ['GET'])

        test_controller = TestController()
        self.router.addMapping(r"^/test/([^/]+)$", test_controller.getTest, ['GET'])
        self.router.addMapping(r"^/test/([^/]+)$", test_controller.saveTest, ['POST'])
        self.router.addMapping(r"^/test/([^/]+)$", test_controller.deleteTest, ['DELETE'])
        self.router.addMapping(r"^/test/$", test_controller.addTest, ['PUT'])
        self.router.addMapping(r"^/test/$", test_controller.listTest, ['GET'])

        user_controller = UserController()
        self.router.addMapping(r"^/user/([^/]+)$", user_controller.getUser, ['GET'])
        self.router.addMapping(r"^/user/([^/]+)$", user_controller.saveUser, ['POST'])
        self.router.addMapping(r"^/user/([^/]+)$", user_controller.deleteUser, ['DELETE'])
        self.router.addMapping(r"^/user/$", user_controller.addUser, ['PUT'])
        self.router.addMapping(r"^/user/$", user_controller.listUser, ['GET'])
        
        metadata_controller = MetadataController()
        self.router.addMapping(r"^/metadata/([^/]+)$", metadata_controller.getMetadata, ['GET'])
        self.router.addMapping(r"^/metadata/([^/]+)$", metadata_controller.saveMetadata, ['POST'])
        self.router.addMapping(r"^/metadata/([^/]+)$", metadata_controller.deleteMetadata, ['DELETE'])
        self.router.addMapping(r"^/metadata/$", metadata_controller.addMetadata, ['PUT'])
        self.router.addMapping(r"^/metadata/$", metadata_controller.listMetadata, ['GET'])

        run_test_controller = RunTestController()
        self.router.addMapping(r"^/t/([0-9]+)/$", run_test_controller.provideBestRouteToTest)

        self.router.addStaticMapping(r"^/admin/static/", "../adminClient/dist")
        self.router.addStaticMapping(r"^/admin/", "../adminClient/dist")


app = App()
wsgi = app.getWsgi()

if __name__ == "__main__":
    print("Serving application at http://localhost:8000")
    app.serve()