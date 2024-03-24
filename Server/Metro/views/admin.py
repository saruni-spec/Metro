from flask import Flask, jsonify, request, Blueprint, session
import json
from Metro.models import *

bp = Blueprint("admin", __name__, url_prefix="/admin")


@bp.route("/bookings", methods=["GET"])
def bookings():
    if request.method == "GET":
        bookings = Booking.query.all()
        print(bookings, "bookings")
        return (
            jsonify(
                {
                    "status": "success",
                    "data": [booking.serialize() for booking in bookings],
                }
            ),
            200,
        )
    else:
        return jsonify({"status": "failed", "message": "Invalid request method"}), 405


@bp.route("/trips", methods=["GET"])
def trips():
    if request.method == "GET":
        trips = Trip.query.all()
        print(trips, "trips")
        return (
            jsonify(
                {"status": "success", "data": [trip.serialize() for trip in trips]}
            ),
            200,
        )
    else:
        return jsonify({"status": "failed", "message": "Invalid request method"}), 405


@bp.route("/transactions", methods=["GET"])
def transactions():
    if request.method == "GET":
        transactions = Transaction.query.all()
        print(transactions, "transactions")
        return (
            jsonify(
                {
                    "status": "success",
                    "data": [transaction.serialize() for transaction in transactions],
                }
            ),
            200,
        )
    else:
        return jsonify({"status": "failed", "message": "Invalid request method"}), 405


@bp.route("/passengers", methods=["GET"])
def users():
    if request.method == "GET":
        users = User.query.filter_by(role="passenger").all()
        print(users, "users")
        return (
            jsonify(
                {"status": "success", "data": [user.serialize() for user in users]}
            ),
            200,
        )
    else:
        return jsonify({"status": "failed", "message": "Invalid request method"}), 405


@bp.route("/drivers", methods=["GET"])
def drivers():
    if request.method == "GET":
        drivers = User.query.filter_by(role="driver").all()
        print(drivers, "drivers")
        return (
            jsonify(
                {
                    "status": "success",
                    "data": [driver.serialize() for driver in drivers],
                }
            ),
            200,
        )
    else:
        return jsonify({"status": "failed", "message": "Invalid request method"}), 405


@bp.route("/vehicles", methods=["GET"])
def vehicles():
    if request.method == "GET":
        vehicles = Vehicle.query.all()
        print(vehicles, "vehicles")
        return (
            jsonify(
                {
                    "status": "success",
                    "data": [vehicle.serialize() for vehicle in vehicles],
                }
            ),
            200,
        )
    else:
        return jsonify({"status": "failed", "message": "Invalid request method"}), 405


@bp.route("/routes", methods=["GET"])
def routes():
    if request.method == "GET":
        routes = Route.query.all()
        print(routes, "routes")
        return (
            jsonify(
                {"status": "success", "data": [route.serialize() for route in routes]}
            ),
            200,
        )
    else:
        return jsonify({"status": "failed", "message": "Invalid request method"}), 405


@bp.route("/stations", methods=["GET"])
def stages():
    if request.method == "GET":
        stages = Stage.query.all()
        print(stages, "stages")
        return (
            jsonify(
                {"status": "success", "data": [stage.serialize() for stage in stages]}
            ),
            200,
        )
    else:
        return jsonify({"status": "failed", "message": "Invalid request method"}), 405
