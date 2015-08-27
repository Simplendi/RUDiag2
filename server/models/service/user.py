from passlib.hash import sha256_crypt

from models.db.user import DbUser

class User:

    def __init__(self):
        # Basic fields
        self.id = None
        self.username = ""
        self.fullname = ""
        self.email = ""
        self.is_admin = False
        self.password_hash = ""
        self.created = None
        self.last_saved = None

    @staticmethod
    def from_db(db_user, user = None):
        if not user:
            user = User()

        user.id = db_user.id
        user.username = db_user.username
        user.fullname = db_user.fullname
        user.email = db_user.email
        user.is_admin = db_user.is_admin
        user.password_hash = db_user.password_hash
        user.created = db_user.created
        user.last_saved = db_user.last_saved

        return user

    @staticmethod
    def from_dict(data_dict, user = None):
        if not user:
            user = User()

        # Basic fields
        user.id = data_dict.get("id", None)
        user.username = data_dict.get("username", "")
        user.fullname = data_dict.get("fullname", "")
        user.email = data_dict.get("email", "")
        user.is_admin = data_dict.get("is_admin", False)

        return user

    def to_db(self, db_user = None):
        if not db_user:
            db_user = DbUser()

        if self.id is not None:
            db_user.id = self.id
        db_user.username = self.username
        db_user.fullname = self.fullname
        db_user.email = self.email
        db_user.is_admin = self.is_admin
        db_user.password_hash = self.password_hash


        return db_user

    def to_dict(self, data_dict = None):
        if not data_dict:
            data_dict = dict()

        # Basic fields
        if self.id is not None:
            data_dict["id"] = self.id

        data_dict["username"] = self.username
        data_dict["fullname"] = self.fullname
        data_dict["email"] = self.email
        data_dict["is_admin"] = self.is_admin
        data_dict["created"] = self.created.isoformat()
        data_dict["last_saved"] = self.last_saved.isoformat()

        return data_dict

    def set_password(self, password):
        self.password_hash = sha256_crypt.encrypt(password)

    def is_password(self, password):
        return sha256_crypt.verify(password, self.password_hash)
