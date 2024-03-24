from datetime import datetime

from flask import Blueprint, jsonify, request, session
from flask_login import current_user, login_required, login_user, logout_user

from Metro.models import Sacco, User

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
        return jsonify({"status": "failed", "msg": "Invalid request"}), 405


@bp.route("/login", methods=["POST"])
def sacco_login():
    if request.method == "POST":
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")
        user = User.query.filter_by(email=email).first()

        if user:
            if user.role == "admin":
                sacco = Sacco.query.filter_by(sacco_id=user.sacco_id).first()
                if sacco.verify_password(password):

                    session["sacco_id"] = sacco.sacco_id
                    login_user(user)
                    print(sacco.sacco_email, "login")
                    return jsonify({"status": "success", "msg": "Logged in"}), 200
                else:
                    return jsonify({"status": "failed", "msg": "Wrong password"}), 400
            else:
                return jsonify({"status": "failed", "msg": "Not Admin"}), 400
        else:
            return (
                jsonify({"status": "failed", "msg": "Admin accout noe existent"}),
                400,
            )
    else:
        return jsonify({"status": "failed", "msg": "Invalid request"}), 405


@bp.route("/details", methods=["GET"])
@login_required
def sacco_details():
    if request.method == "GET":

        print("details")
        current_sacco = session.get("sacco_id")
        print(current_sacco, "sacco")
        sacco = Sacco.query.filter_by(sacco_id=current_sacco).first()

        if sacco:
            print("is sacco")
            return jsonify(
                {
                    "status": "success",
                    "data": {
                        "Name": sacco.sacco_name,
                        "Description": sacco.sacco_description,
                        "location": sacco.sacco_location,
                        "phoneNumber": sacco.sacco_phone,
                        "email": sacco.sacco_email,
                    },
                }
            )
        else:
            print("not sacco")
            return jsonify({"status": "failed", "msg": "Sacco not registered"}), 400
    else:
        return jsonify({"status": "failed", "msg": "Invalid request"}), 405


@bp.route("/logout", methods=["POST"])
def sacco_logout():
    if request.method == "POST":
        logout_user()
        return jsonify({"status": "success", "msg": "Logged out"}), 200
    else:
        return jsonify({"status": "failed", "msg": "Invalid request"}), 405


@bp.route("/add_admin", methods=["POST"])
def add_admin():
    if request.method == "POST":
        data = request.get_json()
        email = data.get("email")
        sacco_email = data.get("sacco_email")
        password = data.get("password")

        user = User.query.filter_by(email=email).first()
        sacco = Sacco.query.filter_by(sacco_email=sacco_email).first()
        if user:
            if user.verify_password(password):
                user.make_admin()
                user.add_sacco(sacco.sacco_id)
                login_user(user)
                return jsonify({"status": "success", "msg": "Logged in"}), 200
            else:
                return jsonify({"status": "failed", "msg": "Wrong password"}), 400
        else:
            return jsonify({"status": "failed", "msg": "USer does not exist"}), 400

    else:
        return jsonify({"status": "failed", "msg": "Invalid request"}), 405


@bp.route("/update", methods=["POST"])
@login_required
def update_sacco():
    if request.method == "POST":
        data = request.get_json()
        sacco = Sacco.query.filter_by(sacco_id=current_user.sacco_id).first()
        if sacco:

            (sacco.change_sacco_name(data.get("name")) if data.get("name") else None)
            (
                sacco.change_sacco_description(data.get("description"))
                if data.get("description")
                else None
            )
            (
                sacco.change_sacco_location(data.get("location"))
                if data.get("location")
                else None
            )
            (sacco.change_sacco_phone(data.get("phone")) if data.get("phone") else None)
            sacco.change_sacco_email(data.get("email")) if data.get("email") else None
            return jsonify({"status": "success", "msg": "Sacco updated"}), 200
        else:
            return jsonify({"status": "failed", "msg": "Sacco not registered"}), 400
    else:
        return jsonify({"status": "failed", "msg": "Invalid request"}), 405


@bp.route("/report", methods=["GET"])
@login_required
def sacco_report():
    if request.method == "GET":

        sacco = Sacco.query.filter_by(sacco_id=current_user.sacco_id).first()
        report = []
        if sacco:
            vehicles = sacco.vehicle
            if vehicles:
                for vehicle in vehicles:
                    total_income = 0
                    income_today = 0
                    trips_today = 0
                    bookings_today = 0
                    date = datetime.now().date()
                    for transaction in vehicle.transaction:
                        total_income += transaction.amount
                    for transaction in vehicle.transaction:
                        if transaction.date == date:

                            income_today += transaction.amount
                    for trip in vehicle.trips:
                        if trip.date == date:
                            trips_today += 1
                    for booking in vehicle.booking:
                        if booking.date == date:
                            bookings_today += 1
                    report.append(
                        {
                            "vehicle": vehicle.no_plate,
                            "driver": vehicle.driver.first_name,
                            "Total_trips": len(vehicle.trips),
                            "Total_income": total_income,
                            "Total_bookings": len(vehicle.booking),
                            "Trips_today": trips_today,
                            "Income_today": income_today,
                            "Bookings_today": bookings_today,
                        }
                    )

                return (
                    jsonify(
                        {"status": "success", "msg": "report submitted", "data": report}
                    ),
                    200,
                )
            else:
                return (
                    jsonify({"status": "failed", "msg": "No report", "data": None}),
                    200,
                )
        else:
            return jsonify({"status": "failed", "msg": "Sacco not registered"}), 400
    else:
        return jsonify({"status": "failed", "msg": "Invalid request"}), 405
