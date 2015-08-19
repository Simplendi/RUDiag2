from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Text
from sqlalchemy import String
from sqlalchemy import DateTime

from . import Base

class DbTest(Base):
    __tablename__ = "test"

    id = Column(Integer, primary_key=True, autoincrement=True)