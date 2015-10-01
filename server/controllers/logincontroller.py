from contextlib import closing
import json

from .basecontroller import BaseController
from framework.httpexceptions import HttpNotFoundException
from framework.httpexceptions import HttpUnauthorizedException
from models.db.user import DbUser
from models.service.user import User


class LoginController(BaseController):

    def __init__(self):
        super().__init__()

    def doLogin(self, state):
        (request, response, session) = state.unfold()

        username = request.body.get("username", "")
        with closing(self._database_session_maker()) as database_session:
            db_user = database_session.query(DbUser).filter(DbUser.username==username).first()
            if not db_user:
                raise HttpUnauthorizedException()

            user = User.from_db(db_user)
            if user.is_password(request.body.get("password", "")):
                response.setJsonBody(json.dumps(user.to_dict()))
                session["user"] = json.dumps(user.to_dict())
            else:
                raise HttpUnauthorizedException()

        return state

    def doLogout(self, state):
        (request, response, session) = state.unfold()

        session["user"] = ""

        return state

    def getLogin(self, state):
        (request, response, session) = state.unfold()

        response.setJsonBody(session.get("user", ""))

        return state