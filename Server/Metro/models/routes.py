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
        existing_stage = Stage.query.filter_by(stage_name=stage_name).first()
        if existing_stage:
            self.stages.append(existing_stage)
        else:
            stage = Stage(stage_name)
            self.stages.append(stage)
        db.session.commit()

    def add_stages(self, stage_names):
        for stage_name in stage_names:
            existing_stage = Stage.query.filter_by(stage_name=stage_name).first()
            if existing_stage:
                self.stages.append(existing_stage)
            else:
                stage = Stage(stage_name)
                self.stages.append(stage)
        db.session.commit()

    def get_stages(self):
        return self.stages

    def add_endpoints(self, endpoints):
        self.endpoints = endpoints
        db.session.commit()

    def serialize(self):
        return {
            "route_id": self.route_id,
            "route_name": self.route_name,
            "route_distance": self.route_distance,
            "endpoints": self.endpoints,
            "stages": [stage.serialize() for stage in self.stages],
        }
