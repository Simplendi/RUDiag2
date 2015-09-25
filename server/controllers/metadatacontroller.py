from controllers.genericcontroller import GenericController
from framework.httpexceptions import HttpUnauthorizedException
from models.db.metadata import DbMetadata
from models.service.metadata import Metadata


class MetadataController(GenericController):

    def __init__(self):
        super().__init__(Metadata, DbMetadata)

    def runBeforeAdd(self, state, metadata):
        if not self._is_user_admin(state.session):
            raise HttpUnauthorizedException()

        return metadata

    def runBeforeSave(self, state, metadata):
        if not self._is_user_admin(state.session):
            raise HttpUnauthorizedException()

        return metadata

    def runBeforeDelete(self, state, metadata):
        if not self._is_user_admin(state.session):
            raise HttpUnauthorizedException()

        return metadata

    def runBeforeList(self, state):
        if not self._get_user_id(state.session):
            raise HttpUnauthorizedException()


    def runBeforeGet(self, state, metadata):
        if not self._is_user_admin(state.session):
            raise HttpUnauthorizedException()

        return metadata
