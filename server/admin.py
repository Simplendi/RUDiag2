import argparse
import config
import getpass
from sqlalchemy import MetaData

import app
app = app

from models.db import Base
from models.service.user import User

from framework import Config

config = Config()
database_session_maker = config["database_session_maker"]

parser = argparse.ArgumentParser(description="Process some integers.")
parser.add_argument('action', choices=["create_db", "create_missing_tables", "create_admin"])

args = parser.parse_args()


def drop_all_tables(engine):
    """
    Fix to enable SQLAlchemy to drop tables even if it didn't know about it.
    :param engine:
    :return:
    """
    meta = MetaData(engine)
    meta.reflect()
    meta.clear()
    meta.reflect()
    meta.drop_all()

if args.action == "create_db":
    database_engine = config["database_engine"]

    drop_all_tables(database_engine)
    Base.metadata.create_all(database_engine)

elif args.action == "create_missing_tables":
    database_engine = config["database_engine"]

    Base.metadata.create_all(database_engine)

elif args.action == "create_admin":
    print("Creating admin account\n")

    password_match = False

    while not password_match:
        password1 = getpass.getpass("Enter password: ")
        password2 = getpass.getpass("Enter password again: ")

        if password1 == password2:
            password_match = True
        else:
            print("Passwords don't match. Try again.\n")


    user = User()
    user.username = "admin"
    user.email = "admin@example.org"
    user.fullname = "Administrator"
    user.is_admin = True
    user.set_password(password1)

    database_session = database_session_maker()

    database_session.add(user.to_db())
    database_session.commit()