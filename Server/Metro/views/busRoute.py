from flask import Blueprint, request, jsonify, session
from Metro.models import Route, Trip, Vehicle
from flask_login import login_required, current_user

bp = Blueprint("bus_route", __name__, url_prefix="/bus_route")


def find_matching_route(routes, pick_up, destination):
    for route in routes:
        print(route.endpoints)
        if route.endpoints is not None:
            print(pick_up, destination, "yy")  # Ensure endpoints is not None
            if pick_up in route.endpoints and destination in route.endpoints:
                return route  # Return the matching route
    return None  # Return None if no matching route is found


@bp.route("/", methods=["POST"])
@login_required
def bus_route():
    if request.method == "POST":

        data = request.get_json()
        print(data, "iii")
        pick_up = data.get("pickupStation").strip()
        destination = data.get("destination").strip()
        print(pick_up, destination, "zzz")
        fare = data.get("fare")
        routes = Route.query.all()

        print(routes)
        current_route = find_matching_route(routes, pick_up, destination)
        print(current_route)
        if current_route is None:
            return jsonify({"status": "failed", "msg": "Route not Found"}), 400
        else:

            current_trip = Trip(current_route.route_id, "fdfd", pick_up, fare)
            current_trip.save()
            current_trip.set_capacity()
            return (
                jsonify(
                    {
                        "status": "success",
                        "message": "Trip Created",
                        "data": {
                            "trip_id": current_trip.trip_id,
                            "route": current_trip.trip_route.route_name,
                            "available_seats": current_trip.available_seats,
                            "booked_seats": current_trip.booked_seats,
                            "depature_time": f"{current_trip.date},{current_trip.time}",
                            "fare": current_trip.fare,
                        },
                    }
                ),
                200,
            )
    else:
        return jsonify({"message": "Invalid request method"}), 405


@bp.route("/check_trip", methods=["GET"])
@login_required
def check_trip():
    if request.method == "GET":
        vehicle_plate = session.get("no_plate")
        trip = Trip.query.filter_by(vehicle_plate=vehicle_plate, ongoing=True).first()
        if trip:
            return jsonify(
                {
                    "status": "success",
                    "message": "Trip found",
                    "data": {
                        "trip_id": trip.trip_id,
                        "route": trip.trip_route.route_name,
                        "available_seats": trip.available_seats,
                        "depature_time": f"{trip.date},{trip.time}",
                        "fare": trip.fare,
                    },
                }
            )
        else:
            return jsonify({"status": "failed", "message": "No trip found"}), 404
    else:
        return jsonify({"status": "failed", "message": "Invalid request method"}), 405


@bp.route("/close_trip", methods=["POST"])
def close_trip():
    if request.method == "POST":
        vehicle = Vehicle.query.filter_by(driver_id=current_user.user_id).first()
        trip = Trip.query.filter_by(
            vehicle_plate=vehicle.no_plate, ongoing=True
        ).first()
        if trip:
            trip.complete()
            return jsonify({"status": "success", "message": "Trip closed"}), 200
        else:
            return jsonify({"status": "failed", "message": "No trip found"}), 404
    else:
        return jsonify({"status": "failed", "message": "Invalid request method"}), 405
