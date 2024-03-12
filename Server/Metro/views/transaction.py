from flask import Flask, jsonify, request, Blueprint, session


bp = Blueprint("transaction", __name__, url_prefix="/transaction")


@bp.route("/", methods=["POST"])
def transaction():
    return jsonify({"status": "failed", "message": "Invalid request method"}), 405
