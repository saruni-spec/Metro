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
