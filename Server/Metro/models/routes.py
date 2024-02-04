from .database import db
from sqlalchemy import Table


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

    stages = db.relationship(
        "Stage", secondary=stages_routes, backref=db.backref("routes", lazy="dynamic")
    )

    def __init__(self, name):
        self.route_name = name

    def save(self):
        db.session.add(self)
        db.session.commit()

    def distance(self, distance):
        self.route_distance = distance
        db.session.commit()

    def stage(self, stages):
        self.stages = stages
        db.session.commit()

    def add_stage(self, stage):
        self.stages.append(stage)
        db.session.commit()

    def add_many_stages(self, stages_list):
        for stage in stages_list:
            self.add_stage(stage)
            db.session.commit()
