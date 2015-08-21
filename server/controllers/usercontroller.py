from controllers.genericcontroller import GenericController
from models.db.user import DbUser
from models.service.user import User


class UserController(GenericController):

    def __init__(self):
        super().__init__(User, DbUser)

    def runBeforeAdd(self, state, user):
        if state.request.body.get("password"):
            return user.set_password(state.request.body.get("password"))

    def runBeforeSave(self, state, user):
        if state.request.body.get("password"):
            return user.set_password(state.request.body.get("password"))