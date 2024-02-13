from flask import Flask, jsonify, request, Blueprint, session
from Metro.models import Trip

bp = Blueprint("find_bus", __name__, url_prefix="/find_bus")


@bp.route("/", methods=["POST"])
def find_bus():
    if request.method == "POST":
        available_buses = []
        data = request.get_json()
        pick_up = data.get("pickupStation").strip()
        destination = data.get("destination").strip()
        trips = Trip.query.filter_by(ongoing=True, start_point=pick_up).all()

        for trip in trips:
            for stage in trip.trip_route.stages:
                if destination == stage.stage_name:
                    available_buses.append(trip)
        if available_buses:
            session["pickup"] = pick_up
            session["destination"] = destination
            return (
                jsonify(
                    {
                        "status": "success",
                        "message": "Bus found",
                        "data": [
                            {
                                "trip": {
                                    "trip_id": trip.trip_id,
                                    "route": trip.trip_route.route_name,
                                    "vehicle": trip.vehicle_plate,
                                    "driver": trip.vehicle.driver.first_name,
                                    "sacco": trip.vehicle.sacco.sacco_name,
                                    "available_seats": trip.available_seats(),
                                    "depature_time": f"{trip.date},{trip.time}",
                                    "fare": trip.fare,
                                }
                            }
                            for trip in available_buses
                        ],
                    }
                ),
                200,
            )

        else:
            return jsonify({"status": "failed", "message": "No bus found"}), 404
    else:
        return jsonify({"status": "failed", "message": "Invalid request method"}), 405
