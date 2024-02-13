from flask import Blueprint, request, jsonify
from Metro.models import Route, Trip

bp = Blueprint("bus_route", __name__, url_prefix="/bus_route")


def find_matching_route(routes, pick_up, destination):
    for route in routes:
        print(route.endpoints)
        if route.endpoints is not None:
            print(pick_up, destination, "yy")  # Ensure endpoints is not None
            if pick_up in route.endpoints and destination in route.endpoints:
                return route  # Return the matching route
    return None  # Return None if no matching route is found


@bp.route("/", methods=["POST"])
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
            return jsonify({"status": "failed", "msg": "Route not Found"}), 400
        else:

            current_trip = Trip(current_route.route_id, "fdfd", pick_up)
            current_trip.save()
            return jsonify({"status": "success", "message": "Trip Created"}), 200
    else:
        return jsonify({"message": "Invalid request method"}), 405
