import json

from sqlalchemy import Column
from sqlalchemy import Boolean
from sqlalchemy import Integer
from sqlalchemy import Text
from sqlalchemy import String

from models import Base

class Metadata(Base):
    __tablename__ = "metadata"

    TYPE_OPEN = "open"
    TYPE_CHOICE = "choice"
    TYPE_TREE = "tree"

    id = Column(String, primary_key=True)
    type = Column(String, nullable=False)
    data = Column(Text, nullable=False)
    multivalue = Column(Boolean, nullable=False, default=False)

    def toDict(self):
        dict = {}
        dict["id"] = self.id
        dict["type"] = self.type
        dict["data"] = json.loads(self.data)
        dict["multivalue"] = self.multivalue

        return dict

    @staticmethod
    def fromDict(dict, metadata=None):
        if not metadata:
            metadata = Metadata()

        metadata.id = dict["id"]
        metadata.type = dict["type"]
        metadata.data = json.dumps(dict["data"])
        metadata.multivalue = dict["multivalue"]

        return metadata
