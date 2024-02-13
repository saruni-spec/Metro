from .database import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from sqlalchemy import Date, Time


class Booking(db.Model):
    __tablename__ = "booking"
    booking_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), ForeignKey("user.email"), nullable=False)
    phone = db.Column(db.String(100), nullable=True)
    date = db.Column(Date, default=datetime.utcnow().date())
    time = db.Column(Time, default=datetime.utcnow().time())
    pickup_point = db.Column(db.String(100), nullable=False)
    destination = db.Column(db.String(100), nullable=False)
    vehicle_plate = db.Column(
        db.String(50), ForeignKey("vehicle.no_plate"), nullable=False
    )
    Status = db.Column(db.String(100), nullable=False)
    trip_id = db.Column(db.Integer, ForeignKey("trip.trip_id"), nullable=False)

    passenger = relationship("User", backref="booking", lazy=True)
    vehicle = relationship("Vehicle", backref="booking", lazy=True)
    trip = relationship("Trip", backref="booking", lazy=True)

    def __init__(self, email, phone, pickup_point, destination, vehicle, trip_id):
        self.email = email
        self.phone = phone
        self.pickup_point = pickup_point
        self.destination = destination
        self.vehicle_plate = vehicle
        self.trip_id = trip_id

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
