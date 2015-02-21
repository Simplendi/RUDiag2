import json
from framework.httpexceptions import HttpNotFoundException

from controllers.basecontroller import BaseController

from models.user import User

class UserController(BaseController):

    def __init__(self):
        super().__init__()

    def getUser(self, state, id):
        (request, response, session) = state.unfold()

        id = int(id)

        database_session = self._database_session_maker()

        try:
            user = database_session.query(User).filter(User.id==id).first()

            if not user:
                raise HttpNotFoundException()

            response.setJsonBody(json.dumps(user.to_dict()))
        finally:
            database_session.close()

        return state

    def addUser(self, state):
        (request, response, session) = state.unfold()

        database_session = self._database_session_maker()

        try:
            #TODO Add parse body fields
            user = User()
            database_session.add(user)
            database_session.commit()

            response.setJsonBody(json.dumps(user.to_dict()))

        finally:
            database_session.close()

        return state

    def saveUser(self, state, id):
        (request, response, session) = state.unfold()

        id = int(id)

        database_session = self._database_session_maker()

        try:
            user = database_session.query(User).filter(User.id==id).first()

            if not user:
                raise HttpNotFoundException()
            #TODO Add parse body fields
            database_session.add(user)
            database_session.commit()

            response.setJsonBody(json.dumps(user.to_dict()))
        finally:
            database_session.close()

        return state

    def deleteUser(self, state):
        return state

    def listUser(self, state):
        (request, response, session) = state.unfold()

        database_session = self._database_session_maker()

        try:
            users = database_session.query(User).order_by(User.id).all()

            users_data = []
            for user in users:
                users_data.append(user.to_dict())

            response.setJsonBody(json.dumps(users_data))

        finally:
            database_session.close()

        return state