from flask import Blueprint, jsonify, request

from Metro.models import Sacco

bp = Blueprint("sacco_registration", __name__, url_prefix="/sacco_registration")


@bp.route("/", methods=["POST"])
def sacco_registration():
    if request.method == "POST":
        data = request.get_json()
        saccoName = data.get("saccoName")
        sacco = Sacco.query.filter_by(sacco_name=saccoName).first()
        if sacco:
            return jsonify({"status": "failed", "msg": "Sacco already registered"}), 400
        else:
            sacco = Sacco(saccoName)
            sacco_description = data.get("saccoDescription")
            location = data.get("location")
            phone = data.get("phoneNumber")
            email = data.get("email")
            password = data.get("password")
            sacco.save(sacco_description, location, phone, email, password)

            return jsonify({"status": "success", "msg": "Sacco registered"}), 200
    else:
        return jsonify({"status": "failed", "msg": "Invalid request"}), 400
