import json

from .basecontroller import BaseController

class LoginController(BaseController):

    def __init__(self):
        super().__init__()

    def doLogin(self, state):
        (request, response, session) = state.unfold()

        response.setJsonBody(json.dumps({'username':'admin', 'id':0, 'is_admin':True}))
        session["user"] = json.dumps({'username':'admin', 'id':0, 'is_admin': True})

        return state

    def doLogout(self, state):
        (request, response, session) = state.unfold()

        session["user"] = ""

        return state

    def getLogin(self, state):
        (request, response, session) = state.unfold()

        response.setJsonBody(session.get("user", ""))

        return state