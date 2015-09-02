import sys
import os

from framework import Config
from configparser import ConfigParser
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from mako.lookup import TemplateLookup
config_parser = ConfigParser()


config_path = "conf/app.ini"

try:
    config_file = open(config_path, "r")
    config_file.close()
except:
    config_path = sys.argv[1]

    #exit("Could not read config file: " + config_path)

config_parser.read(config_path)

config = Config()

# Read database configuration
if "database" not in config_parser:
    exit("No database section in config found")

config["database_engine"] = create_engine(config_parser.get("database", "url"), echo=config_parser.getboolean("database", "echo"))
config["database_session_maker"] = sessionmaker(bind=config["database_engine"])

# Create template lookup to get templates
config["template_lookup"] = TemplateLookup(["views/"]).get_template

# Read session configuration
if "session" not in config_parser:
    exit("No session section in config found")

config["session_cookie"] = config_parser.get("session", "cookie")
config["session_httponly"] = config_parser.getboolean("session", "httponly")
config["session_secure"] = config_parser.getboolean("session", "secure")
config["session_lifetime"] = config_parser.getint("session", "lifetime")

# Configure the upload folder to store files in
if "path" not in config_parser:
    exit("No path section in config found")

config["absolute_url"] = config_parser.get("path", "absolute_url")
if not config["absolute_url"].endswith("/"):
    config["absolute_url"] += "/"

config["upload_folder"] = config_parser.get("path", "upload_folder")
if not config["upload_folder"].endswith("/"):
    config["upload_folder"] += "/"