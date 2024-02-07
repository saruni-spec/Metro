from .database import db
from .database import bcrypt


class Sacco(db.Model):
    __tablename__ = "sacco"
    sacco_id = db.Column(db.Integer, primary_key=True)
    sacco_name = db.Column(db.String(100), unique=True)
    sacco_description = db.Column(db.String(100))
    sacco_location = db.Column(db.String(100))
    sacco_phone = db.Column(db.String(100))
    sacco_email = db.Column(db.String(100))
    sacco_password = db.Column(db.String(100))
    sacco_rating = db.Column(db.Float)

    def __init__(self, sacco_name):
        self.sacco_name = sacco_name

    def save(
        self,
        sacco_description,
        sacco_location,
        sacco_phone,
        sacco_email,
        sacco_password,
    ):
        self.sacco_description = sacco_description
        self.sacco_location = sacco_location
        self.sacco_phone = sacco_phone
        self.sacco_email = sacco_email
        self.sacco_password = bcrypt.generate_password_hash(sacco_password)
        self.sacco_rating = 0

        db.session.add(self)
        db.session.commit()

    def change_sacco_name(self, sacco_name):
        self.sacco_name = sacco_name
        db.session.commit()

    def change_sacco_description(self, sacco_description):
        self.sacco_description = sacco_description
        db.session.commit()

    def change_sacco_location(self, sacco_location):
        self.sacco_location = sacco_location
        db.session.commit()

    def change_sacco_phone(self, sacco_phone):
        self.sacco_phone = sacco_phone
        db.session.commit()

    def change_sacco_email(self, sacco_email):
        self.sacco_email = sacco_email
        db.session.commit()

    def change_sacco_password(self, sacco_password):
        self.sacco_password = sacco_password
        db.session.commit()

    def change_sacco_rating(self, sacco_rating):
        self.sacco_rating = sacco_rating
        db.session.commit()
