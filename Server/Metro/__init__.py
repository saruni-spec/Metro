from .models import *
from .views import *
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate


def create_app():
    app = Flask(__name__)

    app.config[
        "SQLALCHEMY_DATABASE_URI"
    ] = "sqlite://///home/boss/Metro/Server/Metro/models/metro.db"

    bcrypt.init_app(app)
    db.init_app(app)
    CORS(app)

    migrate = Migrate(app, db)

    app.register_blueprint(login_bp)
    app.register_blueprint(user_registration_bp)
    app.register_blueprint(stations_bp)

    return app
