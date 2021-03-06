from controllers.genericcontroller import GenericController
from framework.httpexceptions import HttpUnauthorizedException
from models.db.user import DbUser
from models.service.user import User


class UserController(GenericController):

    def __init__(self):
        super().__init__(User, DbUser)

    def runBeforeAdd(self, state, user):
        if not self._is_user_admin(state.session):
            raise HttpUnauthorizedException()

        if state.request.body.get("password"):
            user.set_password(state.request.body.get("password"))
        return user

    def runBeforeSave(self, state, user):
        if not self._is_user_admin(state.session):
            raise HttpUnauthorizedException()

        if state.request.body.get("password"):
            user.set_password(state.request.body.get("password"))
        return user

    def runBeforeDelete(self, state, user):
        if not self._is_user_admin(state.session):
            raise HttpUnauthorizedException()

        return user

    def runBeforeList(self, state):
        if not self._get_user_id(state.session):
            raise HttpUnauthorizedException()

    def runBeforeGet(self, state, user):
        if not self._is_user_admin(state.session):
            raise HttpUnauthorizedException()

        return user