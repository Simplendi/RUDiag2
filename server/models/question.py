from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Text
from sqlalchemy import String

from models import Base

class Question(Base):
    __tablename__ = "question"

    id = Column(Integer, primary_key=True, autoincrement=True)
    data = Column(Text)
