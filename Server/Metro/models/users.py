from .database import db
from datetime import datetime
from .database import bcrypt
from sqlalchemy import DateTime
from .sacco import Sacco


class User(db.Model):
    __tablename__ = "user"
    user_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    other_name = db.Column(db.String(100), nullable=True)
    email = db.Column(db.String(100), nullable=True, unique=True)
    password = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(100), nullable=True)
    role = db.Column(db.String(50), default="passenger")
    date_registered = db.Column(DateTime, default=datetime.utcnow)
    sacco_id = db.Column(db.String(100), db.ForeignKey("sacco.sacco_id"), nullable=True)

    sacco = db.relationship("Sacco", backref="user", lazy=True)

    def __init__(self, email):
        self.email = email

    def is_authenticated(self):
        return True

    def get_id(self):
        return self.user_id

    def is_active(self):
        return True

    def check_if_driver(self):
        return self.role == "driver"

    def check_sacco(self):
        if self.sacco_id:
            return self.sacco
        else:
            return None

    def save(self, password, first_name, other_name, phone):
        self.first_name = first_name
        self.other_name = other_name
        self.phone = phone

        self.password = bcrypt.generate_password_hash(password)
        db.session.add(self)
        db.session.commit()

    def status(self):
        return "active"

    def update_password(self, password):
        self.password = bcrypt.generate_password_hash(password)
        db.session.commit()

    def verify_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def change_first_name(self, username):
        self.first_name = username
        db.session.commit()

    def change_other_name(self, other_name):
        self.other_name = other_name
        db.session.commit()

    def change_email(self, email):
        self.email = email
        db.session.commit()

    def change_phone(self, phone):
        self.phone = phone
        db.session.commit()

    def is_admin(self):
        return self.role == "admin"

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def commit(self):
        db.session.commit()

    def make_driver(self, sacco_id):
        sacco = Sacco.query.filter_by(sacco_id=sacco_id).first()
        if self.role == "driver" & sacco:
            self.sacco_id = sacco_id
            db.session.commit()
            return True
        else:
            return False

    def is_registered(self, email):
        return User.query.filter_by(email=email).first()
