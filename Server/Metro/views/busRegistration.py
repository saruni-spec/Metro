from flask import Blueprint, request, jsonify, session
from Metro.models import Vehicle
from flask_login import login_required, current_user

bp = Blueprint("bus_registration", __name__, url_prefix="/bus_registration")


@bp.route("/", methods=["POST"])
@login_required
def user_registration():
    if request.method == "POST":
        data = request.get_json()

        if current_user.role == "sacco":
            numberPlate = data.numberPlate
            vehicleType = data.vehicleType
            capacity = data.capacity
            vehicle = Vehicle(numberPlate)
            if vehicle:
                return (
                    jsonify({"status": "failed", "msg": "Vehicle already registered"}),
                    400,
                )
            else:
                vehicle.save(vehicleType, current_user.sacco_id, capacity)
                return jsonify({"status": "success", "msg": "Vehicle registered"}), 200
        else:
            session["vehicleData"] = data
            return jsonify({"status": "on-going", "msg": "User not sacco"}), 200
