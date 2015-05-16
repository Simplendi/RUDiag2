from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import Boolean
from sqlalchemy import Text
from sqlalchemy import String
from sqlalchemy import DateTime
from sqlalchemy.orm import relationship

from models import Base

class Answer(Base):
    __tablename__ = "answer"

    id = Column(Integer, primary_key=True, autoincrement=True)
    access_code = Column(String(length=32), nullable=True)
    test_id = Column(Integer, ForeignKey("test.id"), nullable=False)
    test = relationship("Test")
    answer_data = Column(Text,nullable=False, default="")
    student_data = Column(Text, nullable=False, default="")
    feedback_data = Column(Text, nullable=False, default="")
    requested_at = Column(DateTime, nullable=True)
    opened_at = Column(DateTime, nullable=True)
    finalized_at = Column(DateTime, nullable=True)
    reviewed_at = Column(DateTime, nullable=True)


