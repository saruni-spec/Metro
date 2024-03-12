from flask import Flask, Blueprint, request, jsonify
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
        myvehicle = Vehicle.query.filter_by(driver_id=current_user.user_id).first()
        mytrips = Trip.query.filter_by(vehicle_plate=myvehicle.no_plate).all()
        trips = []
        if mytrips:

            for trip in mytrips:
                trips.append(
                    {
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
                    }
                )
            return jsonify({"status": "success", "data": {"trips": trips}})
        else:
            return jsonify({"status": "success", "data": {"trips": trips}})
    else:
        return jsonify({"status": "failed", "msg": "Invalid request method"}), 405


@bp.route("/current_trip", methods=["GET"])
def current_trip():
    if request.method == "GET":
        vehicle = Vehicle.query.filter_by(driver_id=current_user.user_id).first()
        trip = Trip.query.filter_by(
            vehicle_plate=vehicle.driver_id, ongoing=True
        ).first()

        if trip:
            passengers = Booking.query.filter_by(
                trip_id=trip.trip_id, Status="confirmed"
            ).all()
            passengers_list = []
            for passenger in passengers:
                passengers_list.append(f"{passenger.email}-{passenger.booking_id}")
            return jsonify(
                {
                    "status": "success",
                    "data": {
                        "trip_id": trip.trip_id,
                        "route": trip.trip_route.route_name,
                        "passengers": passengers_list,
                    },
                }
            )
        else:
            return jsonify({"status": "success", "data": "No trip ongoing"})
    else:
        return jsonify({"status": "failed", "msg": "Invalid request method"}), 405
