from flask import Flask, jsonify, request, Blueprint, session
from Metro.models import Booking
from Metro.models import Trip
from Metro.models import Transaction
from .payment import payment, payment_status
from flask_login import current_user, login_required
import json

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
        fare = data.get("fare")

        print(vehicle, "vehicle")
        print(trip_id, "trip_id")

        booking = Booking(email, phone, pickup_point, destination, vehicle, trip_id)
        booking.save()
        session["booking_id"] = booking.booking_id
        session["vehicle_id"] = vehicle
        session["amount"] = fare

        return (
            jsonify(
                {
                    "status": "success",
                    "message": "Booking successful",
                }
            ),
            201,
        )
    else:
        return jsonify({"status": "failed", "message": "Invalid request method"}), 405


@bp.route("/payment", methods=["POST"])
def fare_payment():
    if request.method == "POST":
        response = payment(
            current_user.phone, current_user.email, 10, "Payment for bus fare"
        )
        print(response)
        invoice_id = response["invoice"]["invoice_id"]

        session["invoice_id"] = invoice_id

        transaction = Transaction(
            current_user.email,
            session.get("vehicle_id"),
            session.get("booking_id"),
            session.get("amount"),
            current_user.phone,
        )
        return jsonify({"status": "success", "response": response}), 200
    else:
        return jsonify({"status": "failed", "message": "Invalid request method"}), 405


@bp.route("/payment/status", methods=["POST"])
def fare_status():
    if request.method == "POST":
        invoice_id = session.get("invoice_id")
        response = payment_status(invoice_id)

        status = response["invoice"]["state"]
        print(status)
        return jsonify({"status": status, "response": "ok"}), 200
    else:
        return jsonify({"status": "failed", "message": "Invalid request method"}), 405
