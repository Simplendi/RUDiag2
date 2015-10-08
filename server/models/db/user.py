from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Text
from sqlalchemy import Boolean
from sqlalchemy import String
from sqlalchemy import DateTime
from datetime import datetime

from . import Base

class DbUser(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(length=128), unique=True)
    fullname = Column(Text, nullable=False, default="")
    email = Column(Text, nullable=False, default="")
    is_admin = Column(Boolean, nullable=False, default=False)
    password_hash = Column(String(256), nullable=False, default="")
    created = Column(DateTime, nullable=False, default=datetime.utcnow)
    last_saved = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)


