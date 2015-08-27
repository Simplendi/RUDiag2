from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Text
from sqlalchemy import String
from sqlalchemy import DateTime
from datetime import datetime

from . import Base

class DbQuestion(Base):
    __tablename__ = "question"

    id = Column(Integer, primary_key=True, autoincrement=True)
    data = Column(Text, nullable=False)

    created = Column(DateTime, nullable=False, default=datetime.utcnow)
    last_saved = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)