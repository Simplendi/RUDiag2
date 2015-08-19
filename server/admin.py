import argparse
import config
import getpass
from sqlalchemy import MetaData

import app
app = app

from models.db import Base

from framework import Config

config = Config()
database_session_maker = config["database_session_maker"]

parser = argparse.ArgumentParser(description="Process some integers.")
parser.add_argument('action', choices=["create_db", "create_missing_tables"])

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