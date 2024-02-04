from .database import db
from sqlalchemy import ForeignKey, DateTime
from datetime import datetime
from sqlalchemy.orm import relationship


class Transaction(db.Model):
    __tablename__ = "transaction"

    transaction_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), ForeignKey("user.email"), nullable=False)
    vehicle_id = db.Column(
        db.String(100), ForeignKey("vehicle.no_plate"), nullable=False
    )
    paid_at = db.Column(DateTime, default=datetime.utcnow)
    time = db.Column(db.String(50))
    booking_id = db.Column(
        db.Integer, ForeignKey("booking.booking_id"), unique=True, nullable=False
    )
    amount = db.Column(db.Integer, nullable=False)
    rating = db.Column(db.Integer, nullable=True, default=0)
    phone_number = db.Column(db.String(50))
    status = db.Column(db.String(20), nullable=False, default="pending")

    user = relationship("User", backref="transaction", lazy=True)
    vehicle = relationship("Vehicle", backref="transaction", lazy=True)
    booking = relationship("Booking", backref="transaction", lazy=True)

    def __init__(self, email, vehicle_id, booking_id, amount, phone_number):
        self.email = email
        self.vehicle_id = vehicle_id
        self.time = datetime.now().strftime("%H:%M:%S")
        self.booking_id = booking_id
        self.amount = amount
        self.phone_number = phone_number

    def complete_payment(self):
        self.status = "completed"
        db.session.commit()

    def make_rating(self, rating):
        self.rating = int(rating)
        db.session.commit()

    def save(self):
        db.session.add(self)
        db.session.commit()
