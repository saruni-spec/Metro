from flask import (
    Blueprint,
    request,
    jsonify,
    session,
)
from Metro.models import User, Vehicle
from flask_login import login_user, current_user, login_required, logout_user

bp = Blueprint("login", __name__, url_prefix="/login")


@bp.route("/", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        print(email)
        print(password)

        user = User.query.filter_by(email=email).first()

        if user:
            print("User registered")
            print(user.password, "password")
            if user.verify_password(password):
                print("Password verified")

                login_user(user)
                if user.role == "driver":
                    return (
                        jsonify(
                            {
                                "status": "success",
                                "msg": "Logged in as driver",
                                "role": "driver",
                            }
                        ),
                        200,
                    )
                else:
                    return (
                        jsonify(
                            {
                                "status": "success",
                                "msg": "Logged in as user",
                                "role": "user",
                            }
                        ),
                        200,
                    )
            else:
                return (
                    jsonify({"status": "failed", "msg": "Wrong password"}),
                    400,
                )
        else:
            print("User not registered")
            return jsonify({"status": "failed", "msg": "User not registered"}), 400
    else:
        return jsonify({"status": "failed", "msg": "Method not allowed"}), 405


@bp.route("/logout", methods=["POST"])
@login_required
def logout():
    if request.method == "POST":
        logout_user()
        return (
            jsonify(
                {
                    "status": "success",
                    "msg": "User logged out",
                }
            ),
            200,
        )
    else:
        return jsonify({"status": "failed", "msg": "Method not allowed"}), 405


@bp.route("/role", methods=["GET"])
def role():
    if request.method == "GET":
        if current_user.is_authenticated:
            print(current_user.role, "role")
            if current_user.role == "driver":
                session["driver_id"] = current_user.user_id
                vehicle = Vehicle.query.filter_by(
                    driver_id=current_user.user_id
                ).first()
                session["no_plate"] = vehicle.no_plate
            return (
                jsonify(
                    {
                        "status": "success",
                        "msg": "User is logged in",
                        "role": current_user.role,
                    }
                ),
                200,
            )
        else:
            return (
                jsonify(
                    {"status": "failed", "msg": "User is not logged in", "role": ""}
                ),
                200,
            )
    else:
        return jsonify({"status": "failed", "msg": "Method not allowed"}), 405
