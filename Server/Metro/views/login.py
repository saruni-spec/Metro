from flask import (
    Blueprint,
    request,
    jsonify,
)
from Metro.models import User
from flask_login import login_user, current_user

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
                return jsonify({"status": "success", "msg": "Logged in"}), 200
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
