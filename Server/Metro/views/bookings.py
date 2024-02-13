from flask import Flask, jsonify, request, Blueprint, session
from Metro.models import Booking
from Metro.models import Trip
from flask_login import current_user, login_required


bp = Blueprint("bookings", __name__, url_prefix="/bookings")


@bp.route("/", methods=["POST"])
@login_required
def bookings():
    if request.method == "POST":
        data = request.get_json()
        print(current_user, "current_user")
        email = current_user.email
        phone = current_user.phone
        pickup_point = session.get("pickup")
        destination = session.get("destination")
        vehicle = data.get("vehicle")
        trip_id = data.get("trip_id")

        print(vehicle, "vehicle")
        print(trip_id, "trip_id")

        booking = Booking(email, phone, pickup_point, destination, vehicle, trip_id)
        booking.save()
        return jsonify({"status": "success", "message": "Booking successful"}), 201
    else:
        return jsonify({"status": "failed", "message": "Invalid request method"}), 405
