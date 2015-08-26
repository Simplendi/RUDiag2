import json
from models.db.metadata import DbMetadata

class Metadata:
    # Basic fields
    id = None
    name = ""
    type = ""
    value = ""
    multivalue = False

    @staticmethod
    def from_db(db_metadata, metadata = None):
        if not metadata:
            metadata = Metadata()

        metadata.id = db_metadata.id
        metadata.name = db_metadata.name
        metadata.type = db_metadata.type
        metadata.value = db_metadata.value
        metadata.multivalue = db_metadata.multivalue

        return metadata

    @staticmethod
    def from_dict(data_dict, metadata = None):
        if not metadata:
            metadata = Metadata()

        metadata.id = data_dict.get("id", metadata.id)
        metadata.name = data_dict.get("name", metadata.name)
        metadata.type = data_dict.get("type", metadata.type)
        metadata.value = data_dict.get("value", metadata.value)
        metadata.multivalue = data_dict.get("multivalue", metadata.multivalue)

        return metadata

    def to_db(self, db_metadata = None):
        if not db_metadata:
            db_metadata = DbMetadata()

        if self.id is not None:
            db_metadata.id = self.id

        db_metadata.name = self.name
        db_metadata.type = self.type
        db_metadata.value = self.value
        db_metadata.multivalue = self.multivalue

        return db_metadata

    def to_dict(self, data_dict = None):
        if not data_dict:
            data_dict = dict()

        # Basic fields
        if self.id is not None:
            data_dict["id"] = self.id

        data_dict["name"] = self.name
        data_dict["type"] = self.type
        data_dict["value"] = self.value
        data_dict["multivalue"] = self.multivalue

        return data_dict

