from .models import *
from .views import *
from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = (
        "sqlite://///home/boss/Metro/Server/Metro/models/metro.db"
    )

    bcrypt.init_app(app)
    db.init_app(app)
    CORS(app)

    migrate = Migrate(app, db)
    login_manager.init_app(app)

    app.register_blueprint(login_bp)
    app.register_blueprint(user_registration_bp)
    app.register_blueprint(stations_bp)
    app.register_blueprint(sacco_registration_bp)
    app.register_blueprint(bus_registration_bp)

    return app
