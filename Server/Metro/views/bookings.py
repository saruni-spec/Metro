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

        currentBookings = Booking.query.filter_by(
            email=email, Status="confirmed", trip_id=trip_id
        ).first()
        if currentBookings:
            return (
                jsonify({"status": "failed", "message": "You have a booking Pending"}),
                404,
            )
        else:
            booking = Booking(email, phone, pickup_point, destination, vehicle, trip_id)
            booking.save()
            booking.reduce_seats()
            session["booking_id"] = booking.booking_id
            session["vehicle_id"] = vehicle
            session["amount"] = fare

            return (
                jsonify(
                    {
                        "status": "success",
                        "message": "Booking successful",
                        "booking_id": booking.booking_id,
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
        transaction.save()
        session["transaction_id"] = transaction.transaction_id
        return jsonify({"status": "success", "response": response}), 200
    else:
        return jsonify({"status": "failed", "message": "Invalid request method"}), 405


@bp.route("/payment/status", methods=["POST"])
def fare_status():
    if request.method == "POST":
        invoice_id = session.get("invoice_id")
        response = payment_status(invoice_id)

        transaction_id = session.get("transaction_id")
        status = response["invoice"]["state"]
        print(status)

        if status == "COMPLETE":

            transaction = Transaction.query.filter_by(
                transaction_id=transaction_id
            ).first()
            print("complete transaction")
            transaction.complete_payment()
            return jsonify({"status": status, "response": "ok"}), 200
        if status != "PROCESSING" and status != "COMPLETE":
            transaction = Transaction.query.filter_by(
                transaction_id=transaction_id
            ).first()
            print("cancel transaction")
            transaction.cancel_payment()
            return jsonify({"status": status, "response": "cancelled"}), 404
        else:

            return jsonify({"status": status, "response": "ok"}), 200
    else:
        return jsonify({"status": "failed", "message": "Invalid request method"}), 405


@bp.route("/my_booking", methods=["GET"])
def mybooking():
    if request.method == "GET":
        print(current_user, "current_user")
        email = current_user.email

        currentBooking = (
            Booking.query.filter_by(email=email, Status="confirmed")
            .order_by(Booking.date.desc(), Booking.time.desc())
            .first()
        )
        print(currentBooking, "currentBooking")
        print(email, "email")
        transaction_status = "pending"
        transaction_id = "Not Paid"
        if currentBooking:
            if currentBooking.transaction:
                transaction_status = currentBooking.transaction[0].status
                transaction_id = currentBooking.transaction[0].transaction_id
                print(transaction_status, "transaction_status")
            return (
                jsonify(
                    {
                        "status": "success",
                        "message": "Booking successful",
                        "data": {
                            "id": currentBooking.booking_id,
                            "vehicle": currentBooking.vehicle_plate,
                            "date": f"{currentBooking.date}{currentBooking.time}",
                            "pickup": currentBooking.pickup_point,
                            "destination": currentBooking.destination,
                            "status": currentBooking.Status,
                            "transaction_status": transaction_status,
                            "fare": currentBooking.trip.fare,
                            "transaction_id": transaction_id,
                        },
                    }
                ),
                201,
            )
        else:
            return jsonify({"status": "failed", "message": "No booking found"}), 404

    else:
        return jsonify({"status": "failed", "message": "Invalid request method"}), 405


@bp.route("/cancel", methods=["POST"])
def cancel():
    if request.method == "POST":

        booking = Booking.query.filter_by(
            email=current_user.email, Status="confirmed"
        ).first()

        booking_id = booking.booking_id
        print(booking_id, "booking_id")
        booking = Booking.query.filter_by(booking_id=booking_id).first()
        if booking:
            booking.cancel()
            return (
                jsonify(
                    {"status": "success", "message": "Booking cancelled successfully"}
                ),
                200,
            )
        else:
            return jsonify({"status": "failed", "message": "Booking not found"}), 404

    else:
        return jsonify({"status": "failed", "message": "Invalid request method"}), 405
