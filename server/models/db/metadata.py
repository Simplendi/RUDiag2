from sqlalchemy import Column
from sqlalchemy import Boolean
from sqlalchemy import Integer
from sqlalchemy import Text
from sqlalchemy import String
from sqlalchemy import DateTime
from datetime import datetime

from . import Base

class DbMetadata(Base):
    __tablename__ = "metadata"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(length=256), nullable=False)
    type = Column(String(length=32), nullable=False, default="")
    value = Column(Text, nullable=False, default="")
    multivalue = Column(Boolean, nullable=False, default=False)

    created = Column(DateTime, nullable=False, default=datetime.utcnow)
    last_saved = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)