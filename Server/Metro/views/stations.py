from flask import Flask, jsonify, request, Blueprint
from Metro.models import Stage


bp = Blueprint("stations", __name__, url_prefix="/stations")


@bp.route("/", methods=["GET"])
def get_stations():
    if request.method == "GET":
        stations = Stage.query.all()

        if stations:
            return (
                jsonify(
                    {
                        "status": "success",
                        "msg": "Stations retrieved",
                        "data": [
                            {station.stage_name: [station.latitude, station.longitude]}
                            for station in stations
                        ],
                    }
                ),
                200,
            )
        else:
            return jsonify({"status": "failed", "msg": "No stations found"}), 404
    else:
        return jsonify({"status": "failed", "msg": "Method not allowed"}), 405


from Metro.models import Route

add_stations_bp = Blueprint("add_stations", __name__, url_prefix="/add_stations")


@add_stations_bp.route("/", methods=["POST"])
def add_stations():
    if request.method == "POST":
        selectedStations = []
        data = request.get_json()
        stations = data.get("currentStations")
        for station in stations:
            station = Stage.query.filter_by(stage_name=station).first()
            if station:
                selectedStations.append(station)
            else:
                return jsonify({"status": "error", "message": "Station not found"}), 404
        route = data.get("route")
        route = Route.query.filter_by(route_name=route).first()
        if route:
            route.add_stages(selectedStations)
            return (
                jsonify(
                    {"status": "success", "message": "Stations added successfully"}
                ),
                201,
            )
        else:
            return jsonify({"status": "error", "message": "Route not found"}), 404

    else:
        return jsonify({"status": "error", "message": "Invalid request method"}), 400


reg_stations_bp = Blueprint("reg_stations", __name__, url_prefix="/reg_stations")


@reg_stations_bp.route("/", methods=["POST"])
def reg_stations():
    if request.method == "POST":
        data = request.get_json()
        station = data.get("station")
        new_station = Stage(station)
        new_station.save(latitude=0, longitude=0, stage_description=station)
        return (
            jsonify({"status": "success", "message": "Station added successfully"}),
            201,
        )
    else:
        return jsonify({"status": "error", "message": "Invalid request method"}), 400
