from .database import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from sqlalchemy import Date, Time
from .trips import Trip


class Booking(db.Model):
    __tablename__ = "booking"
    booking_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), ForeignKey("user.email"), nullable=False)
    phone = db.Column(db.String(100), nullable=True)
    date = db.Column(Date, default=datetime.utcnow().date())
    time = db.Column(Time, default=lambda: datetime.utcnow().time())
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

        self.Status = "confirmed"

    def save(self):

        db.session.add(self)
        db.session.commit()

    def confirm(self):

        db.session.commit()

    def cancel(self):
        self.Status = "Cancelled"
        self.trip.available_seats += 1
        self.trip.booked_seats -= 1

        if self.transaction:
            self.transaction[0].cancel_payment()
        db.session.commit()

    def commit():
        db.session.commit()

    def reduce_seats(self):
        self.trip.reduce_seats()

    def complete(self):
        self.Status = "Completed"
        db.session.commit()

    def serialize(self):
        return {
            "booking_id": self.booking_id,
            "email": self.email,
            "phone": self.phone,
            "date": self.date.strftime("%Y-%m-%d"),  # convert date to string
            "time": self.time.strftime("%H:%M"),
            "pickup_point": self.pickup_point,
            "destination": self.destination,
            "vehicle_plate": self.vehicle_plate,
            "Status": self.Status,
            "trip_id": self.trip_id,
        }
