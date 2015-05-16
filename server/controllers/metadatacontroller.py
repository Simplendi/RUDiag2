import json
from framework.httpexceptions import HttpNotFoundException

from controllers.basecontroller import BaseController

from models.metadata import Metadata

class MetadataController(BaseController):

    def __init__(self):
        super().__init__()

    def getMetadata(self, state, id):
        (request, response, session) = state.unfold()

        database_session = self._database_session_maker()

        try:
            metadata = database_session.query(Metadata).filter(Metadata.id==id).first()

            if not metadata:
                raise HttpNotFoundException()

            data = metadata.toDict()

            response.setJsonBody(json.dumps(data))
        finally:
            database_session.close()

        return state

    def addMetadata(self, state):
        (request, response, session) = state.unfold()

        database_session = self._database_session_maker()

        try:
            metadata = Metadata.fromDict(request.body)

            database_session.add(metadata)
            database_session.commit()

            response.setJsonBody(json.dumps(request.body))

        finally:
            database_session.close()

        return state

    def saveMetadata(self, state, id):
        (request, response, session) = state.unfold()

        database_session = self._database_session_maker()

        try:
            metadata = database_session.query(Metadata).filter(Metadata.id==id).first()

            if not metadata:
                raise HttpNotFoundException()

            metadata = Metadata.fromDict(request.body, metadata)
            database_session.add(metadata)
            database_session.commit()

            response.setJsonBody(json.dumps(request.body))
        finally:
            database_session.close()

        return state

    def deleteMetadata(self, state, id):
        (request, response, session) = state.unfold()

        database_session = self._database_session_maker()

        try:
            database_session.query(Metadata).filter(Metadata.id==id).delete()
            database_session.commit()
        finally:
            database_session.close()

        return state

    def listMetadata(self, state):
        (request, response, session) = state.unfold()

        database_session = self._database_session_maker()

        try:
            metadatas = database_session.query(Metadata).order_by(Metadata.id).all()

            metadatas_data = []
            for metadata in metadatas:
                metadatas_data.append(metadata.toDict())

            response.setJsonBody(json.dumps(metadatas_data))

        finally:
            database_session.close()

        return state