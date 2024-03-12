from .database import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from sqlalchemy import Date, Time


class Trip(db.Model):
    __tablename__ = "trip"
    trip_id = db.Column(db.Integer, primary_key=True)
    vehicle_plate = db.Column(
        db.String(50), ForeignKey("vehicle.no_plate"), nullable=False
    )
    route = db.Column(db.String(50), ForeignKey("route.route_id"), nullable=False)
    ongoing = db.Column(db.Boolean, default=True)
    start_point = db.Column(db.String(50), nullable=True)
    available_seats = db.Column(db.Integer, nullable=True)
    booked_seats = db.Column(db.Integer, default=0)
    date = db.Column(Date, default=datetime.utcnow().date())
    time = db.Column(Time, default=datetime.utcnow().time())
    fare = db.Column(db.Float, nullable=True)

    vehicle = relationship("Vehicle", backref="trips", lazy=True)
    trip_route = relationship("Route", backref="route", lazy=True)

    def __init__(self, route, vehicle_plate, start_point, fare):
        self.route = route
        self.vehicle_plate = vehicle_plate
        self.start_point = start_point
        self.fare = fare

    def save(self):

        db.session.add(self)
        db.session.commit()

    def set_capacity(self):
        self.available_seats = self.vehicle.capacity
        db.session.commit()

    def complete(self):
        self.ongoing = False
        db.session.commit()

    def reduce_seats(self):
        self.available_seats -= 1
        self.booked_seats += 1
        db.session.commit()

    def set_depature_time(self, time):
        self.depature_time = time
        db.session.commit()

    def check_ongoing(self, user):
        if self.ongoing and self.vehicle.driver_id == user:
            return True
        else:
            return False

    def cancel_trip(self):
        self.ongoing = False
        db.session.commit()

    def cancel_booking(self, seats):
        self.available_seats += seats
        self.booked_seats -= seats
        db.session.commit()
