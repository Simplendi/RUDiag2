from framework import Config

class BaseController():

    def __init__(self):
        self._config = Config()
        self._database_session_maker = self._config['database_session_maker']
