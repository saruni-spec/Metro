from Metro import create_app
from flask import jsonify

app = create_app()


@app.errorhandler(401)
def not_logged_in(e):
    return jsonify({"status": "failed", "msg": "User not logged in"}), 401


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
