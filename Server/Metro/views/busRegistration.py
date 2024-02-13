from flask import Blueprint, request, jsonify, session
from Metro.models import Vehicle
from flask_login import login_required, current_user

bp = Blueprint("bus_registration", __name__, url_prefix="/bus_registration")


@bp.route("/", methods=["POST"])
def bus_registration():
    if request.method == "POST":
        data = request.get_json()
        numberPlate = data.get("numberPlate")
        vehicleType = data.get("vehicleType")
        capacity = data.get("capacity")
        vehicle = Vehicle.query.filter_by(no_plate=numberPlate).first()
        if vehicle:
            return (
                jsonify({"status": "failed", "msg": "Vehicle already registered"}),
                400,
            )
        else:
            vehicle = Vehicle(numberPlate)
            vehicle.save(vehicleType, 1, capacity)
            return jsonify({"status": "success", "msg": "Vehicle registered"}), 200

    else:
        return jsonify({"status": "failed", "msg": "Invalid request"}), 400
