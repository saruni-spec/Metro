from flask import Blueprint, request, jsonify
from Metro.models import User

bp = Blueprint("user_registration", __name__, url_prefix="/user_registration")


@bp.route("/", methods=["GET", "POST"])
def user_registration():
    if request.method == "POST":
        data = request.get_json()
        first_name = data.get("firstName")
        other_name = data.get("otherName")
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
