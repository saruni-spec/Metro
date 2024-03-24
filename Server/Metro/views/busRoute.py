from flask import Blueprint, request, jsonify, session
from Metro.models import Route, Trip, Vehicle
from flask_login import login_required, current_user

bp = Blueprint("bus_route", __name__, url_prefix="/bus_route")


def find_matching_route(routes, pick_up, destination):
    myRoute = f"{pick_up}-{destination}"
    myRouteReversed = f"{destination}-{pick_up}"
    for route in routes:
        print(route.route_name, "route.route_name")
        print(myRoute, "myRoute")
        print(myRouteReversed, "myRouteReversed")

        if route.route_name == myRoute or route.route_name == myRouteReversed:
            if route.endpoints is None:

                route.add_endpoints([pick_up, destination])
            return route

        else:
            print(route.route_name, "route.route_name")
            print("route does not exist")
            # Return the matching route
    return None


@bp.route("/", methods=["POST"])
@login_required
def bus_route():
    if request.method == "POST":

        data = request.get_json()
        print(data, "iii")
        pick_up = data.get("pickupStation").strip()
        destination = data.get("destination").strip()
        print(pick_up, destination, "zzz")
        fare = data.get("fare")
        routes = Route.query.all()

        print(routes)
        current_route = find_matching_route(routes, pick_up, destination)
        print(current_route)
        if current_route is None:
            print("creating new route")
            route = Route(f"{pick_up}-{destination}", [pick_up, destination], 0)

            route.save()
            route.add_stage(pick_up)
            route.add_stage(destination)
            current_route = route
        else:
            print("route exists")
        print(current_route, "current_route")
        if pick_up not in current_route.stages:
            current_route.add_stage(pick_up)
        if destination not in current_route.stages:
            current_route.add_stage(destination)

        current_trip = Trip(current_route.route_id, "fdfd", pick_up, fare)
        current_trip.save()
        current_trip.set_capacity()
        return (
            jsonify(
                {
                    "status": "success",
                    "message": "Trip Created",
                    "data": {
                        "trip_id": current_trip.trip_id,
                        "route": current_trip.trip_route.route_name,
                        "available_seats": current_trip.available_seats,
                        "booked_seats": current_trip.booked_seats,
                        "depature_time": f"{current_trip.date},{current_trip.time}",
                        "fare": current_trip.fare,
                    },
                }
            ),
            200,
        )
    else:
        return jsonify({"message": "Invalid request method"}), 405


@bp.route("/check_trip", methods=["GET"])
@login_required
def check_trip():
    if request.method == "GET":
        vehicle_plate = session.get("no_plate")
        trip = Trip.query.filter_by(vehicle_plate=vehicle_plate, ongoing=True).first()
        if trip:
            return jsonify(
                {
                    "status": "success",
                    "message": "Trip found",
                    "data": {
                        "trip_id": trip.trip_id,
                        "route": trip.trip_route.route_name,
                        "available_seats": trip.available_seats,
                        "depature_time": f"{trip.date},{trip.time}",
                        "fare": trip.fare,
                    },
                }
            )
        else:
            return jsonify({"status": "failed", "message": "No trip found"}), 404
    else:
        return jsonify({"status": "failed", "message": "Invalid request method"}), 405


@bp.route("/close_trip", methods=["POST"])
def close_trip():
    if request.method == "POST":
        data = request.get_json()
        index = data.get("index")
        print(index, "index of trip")
        vehicle = Vehicle.query.filter_by(driver_id=current_user.user_id).first()
        trip = Trip.query.filter_by(
            vehicle_plate=vehicle.no_plate, ongoing=True
        ).first()
        if trip:
            if index == 0:
                print("trip completed")
                trip.complete()
            else:
                print("trip cancelled")
                trip.cancel_trip()
            return jsonify({"status": "success", "message": "Trip closed"}), 200
        else:
            return jsonify({"status": "failed", "message": "No trip found"}), 404
    else:
        return jsonify({"status": "failed", "message": "Invalid request method"}), 405
