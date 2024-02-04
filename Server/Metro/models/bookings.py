from .database import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship


class Booking(db.Model):
    __tablename__ = "booking"
    booking_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), ForeignKey("user.email"), nullable=False)
    phone = db.Column(db.String(100), nullable=True)
    date = db.Column(db.String(100), nullable=False)
    time = db.Column(db.String(100), nullable=False)
    pickup_point = db.Column(db.String(100), nullable=False)
    destination = db.Column(db.String(100), nullable=False)
    vehicle_plate = db.Column(
        db.String(50), ForeignKey("vehicle.no_plate"), nullable=False
    )
    Status = db.Column(db.String(100), nullable=False)

    passenger = relationship("User", backref="booking", lazy=True)
    vehicle = relationship("Vehicle", backref="booking", lazy=True)

    def __init__(self, email, phone, date, time, pickup_point, destination, vehicle):
        self.email = email
        self.phone = phone
        self.date = date
        self.time = time
        self.pickup_point = pickup_point
        self.destination = destination
        self.vehicle_plate = vehicle

        self.Status = "Pending"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def confirm(self):
        self.Status = "confirmed"
        db.session.commit()

    def cancel(self):
        self.Status = "Cancelled"
        db.session.commit()

    def commit():
        db.session.commit()
