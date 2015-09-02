from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Text
from sqlalchemy import String
from sqlalchemy import DateTime
from datetime import datetime

from . import Base

class DbTestSession(Base):
    __tablename__ = "test_session"

    id = Column(String(32), primary_key=True)

    test_id = Column(Integer, nullable=False)

    email = Column(String(256), nullable=False, default="")
    name = Column(String(256), nullable=False, default="")
    student_id = Column(String(256), nullable=False, default="")

    invited_at = Column(DateTime)
    opened_at = Column(DateTime)
    updated_at = Column(DateTime)
    closed_at = Column(DateTime)
    reviewed_at = Column(DateTime)
    feedback_at = Column(DateTime)

    data = Column(Text, nullable=False, default="")
