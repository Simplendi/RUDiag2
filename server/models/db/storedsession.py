from models.db import Base
from sqlalchemy import Column
from sqlalchemy import Text
from sqlalchemy import DateTime
from sqlalchemy.dialects.postgresql import UUID


class StoredSession(Base):
    __tablename__ = "sessions"
    id = Column(UUID, primary_key=True, nullable=False)
    data = Column(Text, nullable=False)
    expires = Column(DateTime, nullable=False)
