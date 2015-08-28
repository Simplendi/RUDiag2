from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Text
from sqlalchemy import String
from sqlalchemy import DateTime
from datetime import datetime

from . import Base

class DbTest(Base):
    __tablename__ = "test"

    id = Column(Integer, primary_key=True, autoincrement=True)
    data = Column(Text, nullable=False, default="")

    created = Column(DateTime, nullable=False, default=datetime.utcnow)
    last_saved = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)