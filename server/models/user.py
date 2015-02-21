from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Text
from sqlalchemy import String
from sqlalchemy import Boolean

from models import Base

class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String, unique=True, nullable=False)
    fullname = Column(String, nullable=False)
    email = Column(String, nullable=False, index=True)
    password_hash = Column(String, nullable=False)
    is_admin = Column(Boolean, nullable=False)


    def to_dict(self, include_password=False):
        dict = {}
        dict["id"] = self.id
        dict["username"] = self.username
        dict["fullname"] = self.fullname
        dict["email"] = self.email
        dict["is_admin"] = self.is_admin
        if include_password:
            dict["password_hash"] = self.password_hash

        return dict
