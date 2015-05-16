from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Text
from sqlalchemy import String
from sqlalchemy import DateTime

from models import Base

class Test(Base):
    __tablename__ = "test"

    STATUS_PLANNED = "planned"
    STATUS_OPEN = "open"
    STATUS_CLOSED = "closed"
    STATUS_REVIEWED = "reviewed"

    INVITE_MODE_NONE = ""
    INVITE_MODE_URL_REQUEST = "url_request"
    INVITE_MODE_URL_LOGIN = "url_login"
    INVITE_MODE_CODE = "code"
    INVITE_MODE_EMAIL = "email"

    id = Column(Integer, primary_key=True, autoincrement=True)
    status = Column(String, nullable=False, default=STATUS_PLANNED)
    start_date = Column(DateTime, nullable=True)
    end_date = Column(DateTime, nullable=True)
    data = Column(Text)

    def get_invite_mode(self):
        return self.data.get("planning", {}).get("invite_mode", Test.INVITE_MODE_NONE)
