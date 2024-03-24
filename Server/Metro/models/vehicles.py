from .database import db
from sqlalchemy import ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from .users import User
from .sacco import Sacco


class Vehicle(db.Model):
    __tablename__ = "vehicle"

    vehicle_type = db.Column(db.String(50))
    no_plate = db.Column(db.String(50), primary_key=True)
    capacity = db.Column(db.Integer)
    sacco_id = db.Column(db.String(100), ForeignKey("sacco.sacco_id"), nullable=False)
    driver_id = db.Column(db.String(100), ForeignKey("user.user_id"), nullable=True)
    date_registered = db.Column(DateTime, default=datetime.utcnow)
    balance = db.Column(db.Float, nullable=True)
    rating = db.Column(db.Float, nullable=True)
    fare = db.Column(db.Float, nullable=True)
    is_active = db.Column(db.Boolean, default=True)

    sacco = relationship("Sacco", backref="vehicle", lazy=True)
    driver = relationship("User", backref="vehicle", lazy=True)

    def __init__(self, no_plate):
        self.no_plate = no_plate

    def get_id(self):
        return self.no_plate

    def add_driver(self, driver_username):
        driver = User.query.filter_by(user_name=driver_username).first()
        if driver & driver.sacco_id == self.sacco_id:
            self.driver = driver
            db.session.commit()
            return True
        else:
            return False

    def save(self, vehicle_type, sacco, capacity):
        self.vehicle_type = vehicle_type
        self.sacco_id = sacco
        self.capacity = capacity
        self.balance = 0

        db.session.add(self)
        db.session.commit()

    def change_driver(self, driver):
        driver = User.query.filter_by(user_name=driver).first()
        if driver & driver.sacco_id == self.sacco_id:
            self.driver = driver
            db.session.commit()
            return True
        else:
            return False

    def change_sacco(self, sacco_name):
        sacco = Sacco.query.filter_by(sacco_name=sacco_name).first()
        if sacco:
            self.sacco_id = sacco.sacco_id
            db.session.commit()
            return True
        else:
            return False

    def change_capacity(self, capacity):
        self.capacity = capacity
        db.session.commit()

    def unregister_vehicle(self):
        self.is_active = False
        db.session.commit()

    def commit(self):
        db.session.commit()

    def set_fare(self, fare):
        self.fare = fare
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def add_verification_code(self, code):
        self.verification_code = code
        db.session.commit()

    def add_payment(self, amount):
        self.balance += amount
        db.session.commit()

    def payout(self, amount):
        self.balance -= float(amount)
        db.session.commit()

    def make_rating(self):
        total_rating = 0
        if len(self.transactions) == 0:
            self.rating = 0
        else:
            for rating in self.transactions:
                total_rating += rating.rating
            average_rating = total_rating / len(self.transactions)
            self.rating = average_rating

    def serialize(self):
        return {
            "vehicle_type": self.vehicle_type,
            "no_plate": self.no_plate,
            "capacity": self.capacity,
            "sacco_id": self.sacco_id,
            "driver_id": self.driver_id,
            "date_registered": self.date_registered.strftime("%Y-%m-%d"),
            "balance": self.balance,
            "rating": self.rating,
            "fare": self.fare,
            "is_active": self.is_active,
        }
