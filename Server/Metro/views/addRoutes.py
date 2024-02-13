from flask import Blueprint, request, jsonify
from Metro.models import Route

bp = Blueprint("add_route", __name__, url_prefix="/add_route")


@bp.route("/", methods=["POST"])
def add_route():
    if request.method == "POST":
        data = request.get_json()
        routeName = f"{data.get('start')}-{data.get('end')}"
        distance = data.get("distance")
        endpoints = [data.get("start"), data.get("end")]
        route = Route(routeName, endpoints, distance)
        route.save()
        return (
            jsonify({"status": "success", "message": "Route added successfully"}),
            201,
        )
    else:
        return jsonify({"status": "error", "message": "Invalid request method"}), 400


get_routes_bp = Blueprint("get_routes", __name__, url_prefix="/get_routes")


@get_routes_bp.route("/", methods=["GET"])
def get_routes():
    if request.method == "GET":
        routes = Route.query.all()
        if routes:
            return (
                jsonify(
                    {
                        "status": "success",
                        "msg": "Routes retrieved",
                        "data": [
                            {
                                route.route_name: {
                                    "distance": route.route_distance,
                                    "endpoints": route.endpoints,
                                }
                            }
                            for route in routes
                        ],
                    }
                ),
                200,
            )
        else:
            return jsonify({"status": "failed", "msg": "No routes found"}), 404
    else:
        return jsonify({"status": "failed", "msg": "Method not allowed"}), 405
