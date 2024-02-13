from .database import db
from sqlalchemy import Table
from sqlalchemy import PickleType
from .stages import Stage


stages_routes = Table(
    "stages_routes",
    db.Model.metadata,
    db.Column("route_id", db.Integer, db.ForeignKey("route.route_id")),
    db.Column("stage_id", db.Integer, db.ForeignKey("stage.stage_id")),
)


class Route(db.Model):
    __tablename__ = "route"
    route_id = db.Column(db.Integer, primary_key=True)
    route_distance = db.Column(db.Float)
    route_name = db.Column(db.String(100))
    endpoints = db.Column(PickleType)

    stages = db.relationship(
        "Stage", secondary=stages_routes, backref=db.backref("routes", lazy="dynamic")
    )

    def __init__(self, name, endpoints, distance):
        self.route_name = name
        self.endpoints = endpoints
        self.route_distance = distance

    def save(self):
        db.session.add(self)
        db.session.commit()

    def add_stage(self, stage_name):
        stage = Stage(stage_name)
        self.stages.append(stage)
        db.session.commit()

    def add_stages(self, stage_names):
        for stage in stage_names:
            self.stages.append(stage)
        db.session.commit()

    def get_stages(self):
        return self.stages
