from flask import Flask, Blueprint, request, jsonify, session
from Metro.models import User, Trip, Vehicle, Transaction, Booking
from flask_login import login_required, current_user


bp = Blueprint("profile", __name__, url_prefix="/profile")


@bp.route("/", methods=["GET"])
@login_required
def profile():
    if request.method == "GET":
        userName = f"{current_user.first_name} {current_user.other_name}"
        email = current_user.email
        phone = current_user.phone
        return jsonify(
            {
                "status": "success",
                "data": {"name": userName, "email": email, "phone": phone},
            }
        )

    else:
        return jsonify({"status": "failed", "msg": "Invalid request method"}), 405


@bp.route("/driver_history", methods=["GET"])
@login_required
def history():
    if request.method == "GET":
        vehicle = session.get("no_plate")
        mytrips = (
            Trip.query.filter_by(vehicle_plate=vehicle)
            .order_by(Trip.date.desc(), Trip.time.desc())
            .all()
        )
        trips = []
        if mytrips:

            for trip in mytrips:
                trips.append(
                    {
                        "trip_id": trip.trip_id,
                        "route": trip.trip_route.route_name,
                        "booked_seats": trip.booked_seats,
                        "depature_time": f"{trip.date},{trip.time}",
                        "fare": trip.fare,
                    }
                )
            return jsonify({"status": "success", "data": {"trips": trips}})
        else:
            return jsonify({"status": "success", "data": {"trips": trips}})
    else:
        return jsonify({"status": "failed", "msg": "Invalid request method"}), 405


@bp.route("/update", methods=["POST"])
@login_required
def update():
    if request.method == "POST":
        data = request.get_json()
        password = data.get("password")
        if password:
            current_user.update_password(password)
        first_name = data.get("first_name")
        if first_name:
            current_user.change_first_name(first_name)
        other_name = data.get("other_name")
        if other_name:
            current_user.change_other_name(other_name)
        phone = data.get("phone")
        if phone:
            current_user.change_phone(phone)
        email = data.get("email")
        if email:
            current_user.change_email(email)

        print(email, phone, first_name, other_name, password)

        return jsonify({"status": "success", "msg": "Profile updated successfully"})
    else:
        return jsonify({"status": "failed", "msg": "Invalid request method"}), 405


@bp.route("/delete", methods=["POST"])
def delete():
    if request.method == "POST":
        current_user.delete()
        return jsonify({"status": "success", "msg": "Profile deleted successfully"})
    else:
        return jsonify({"status": "failed", "msg": "Invalid request method"}), 405


@bp.route("/user_history", methods=["GET"])
@login_required
def user_history():
    if request.method == "GET":
        mytrips = Transaction.query.filter_by(email=current_user.email).all()
        trips = []
        if mytrips:
            for trip in mytrips:
                trips.append(
                    {
                        "route": trip.booking.trip.trip_route.route_name,
                        "depature_time": f"{trip.date},{trip.time}",
                        "fare": trip.amount,
                        "vehicle": trip.vehicle.no_plate,
                        "status": trip.status,
                        "booking_id": trip.booking.booking_id,
                        "transaction_id": trip.booking.transaction[0].transaction_id,
                    }
                )
            return jsonify({"status": "success", "data": {"trips": trips}})
        else:
            return jsonify({"status": "success", "data": {"trips": trips}})
    else:
        return jsonify({"status": "failed", "msg": "Invalid request method"}), 405


@bp.route("/current_trip", methods=["POST"])
def current_trip():
    if request.method == "POST":

        trip_id = request.get_json().get("trip_id")
        trip = Trip.query.filter_by(
            trip_id=trip_id,
        ).first()

        if trip:
            passengers = Booking.query.filter(
                Booking.trip_id == trip_id,
                Booking.Status.in_(["confirmed", "Completed"]),
            ).all()
            passengers_list = []
            for passenger in passengers:
                if passenger.transaction:
                    passengers_list.append(
                        {
                            "name": f"{passenger.passenger.first_name} {passenger.passenger.other_name}",
                            "phone": passenger.phone,
                            "booking_id": passenger.booking_id,
                            "destination": passenger.destination,
                            "amount": passenger.transaction[0].amount,
                            "status": passenger.transaction[0].status,
                        }
                    )
                else:
                    passengers_list.append(
                        {
                            "name": f"{passenger.passenger.first_name} {passenger.passenger.other_name}",
                            "phone": passenger.phone,
                            "booking_id": passenger.booking_id,
                            "destination": passenger.destination,
                            "amount": "Not paid",
                            "status": "Not paid",
                        }
                    )
            return jsonify(
                {
                    "status": "success",
                    "data": {
                        "trip_id": trip.trip_id,
                        "route": trip.trip_route.route_name,
                        "fare": trip.fare,
                        "depature_time": f"{trip.date},{trip.time}",
                        "booked_seats": trip.booked_seats,
                        "passengers": passengers_list,
                    },
                }
            )
        else:
            return jsonify({"status": "success", "data": "No trip ongoing"}), 404
    else:
        return jsonify({"status": "failed", "msg": "Invalid request method"}), 405
