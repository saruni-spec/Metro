from .models import *
from .views import *
from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_login import LoginManager


def create_app():
    app = Flask(__name__)

    app.secret_key = "metro"

    app.config["SQLALCHEMY_DATABASE_URI"] = (
        "sqlite://///home/boss/Metro/Server/Metro/models/metro.db"
    )

    bcrypt.init_app(app)
    db.init_app(app)
    CORS(app, supports_credentials=True)

    migrate = Migrate(app, db)
    login_manager = LoginManager()

    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    app.register_blueprint(login_bp)
    app.register_blueprint(user_registration_bp)
    app.register_blueprint(stations_bp)
    app.register_blueprint(sacco_registration_bp)
    app.register_blueprint(bus_registration_bp)
    app.register_blueprint(add_routes_bp)
    app.register_blueprint(add_stations_bp)
    app.register_blueprint(get_routes_bp)
    app.register_blueprint(reg_stations_bp)
    app.register_blueprint(bus_route_bp)
    app.register_blueprint(find_bus_bp)
    app.register_blueprint(bookings_bp)
    app.register_blueprint(transactions_bp)
    app.register_blueprint(profile_bp)

    return app
