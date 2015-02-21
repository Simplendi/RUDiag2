class SessionRepository():

    def __init__(self):
        """Initialize a SessionRepository with a DatabasePool
        """
        self.session_store = {}


    def get(self, session_id):
        """Get a session by SessionID. If no session is found with session ID false is returned
        """
        session = self.session_store.get(session_id, None)
        if session:
            session._stored = True
            return session
        else:
            return False

    def add(self, session):
        """Add a session to the database
        """
        self.session_store[str(session.id)] = session


    def save(self, session):
        """Save changes to a session into the database.
        """
        self.session_store[str(session.id)] = session

    def clean(self):
        """Remove all expired sessions
        """
        self.session_store = {}
        
        