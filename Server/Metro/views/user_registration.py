from flask import Blueprint, request, jsonify
from flask_login import current_user
from Metro.models import User, Vehicle

bp = Blueprint("user_registration", __name__, url_prefix="/user_registration")


@bp.route("/", methods=["GET", "POST"])
def user_registration():
    if request.method == "POST":
        data = request.get_json()
        first_name = data.get("firstName")
        other_name = data.get("lastName")
        password = data.get("password")
        email = data.get("email")
        phone = data.get("phoneNumber")

        user = User.query.filter_by(email=email).first()

        if user:
            return jsonify({"status": "failed", "msg": "User already registered"}), 400
        else:
            user = User(email)
            user.save(password, first_name, other_name, phone)
            return jsonify({"status": "success", "msg": "User registered"}), 200

    else:
        return jsonify({"status": "failed", "msg": "Method not allowed"}), 405


@bp.route("/driver_registration", methods=["POST"])
def driver_registration():
    if request.method == "POST":
        data = request.get_json()
        numberPlate = data.get("numberPlate")
        first_name = data.get("firstName")
        other_name = data.get("lastName")
        password = data.get("password")
        email = data.get("email")
        phone = data.get("phoneNumber")

        vehicle = Vehicle.query.filter_by(no_plate=numberPlate).first()
        if vehicle:
            sacco_id = vehicle.sacco_id
            if vehicle.driver_id:
                current_driver = User.query.filter_by(user_id=vehicle.driver_id).first()
                current_driver.make_passenger()

            user = User.query.filter_by(email=email).first()
            if user:
                vehicle.add_driver(user.user_id)

                return (
                    jsonify({"status": "failed", "msg": "User already registered"}),
                    200,
                )
            else:
                user = User(email)
                user.save(password, first_name, other_name, phone)
                vehicle.add_driver(user.user_id)
                return jsonify({"status": "success", "msg": "User registered"}), 200
        else:
            return jsonify({"status": "failed", "msg": "Vehicle not registered"}), 400
    else:
        return jsonify({"status": "failed", "msg": "Method not allowed"}), 405
