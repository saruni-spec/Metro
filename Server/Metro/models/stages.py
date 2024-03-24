from .database import db


class Stage(db.Model):
    __tablename__ = "stage"
    stage_id = db.Column(db.Integer, primary_key=True)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    stage_name = db.Column(db.String(100))
    stage_description = db.Column(db.String(100))

    def __init__(self, stage_name):
        self.stage_name = stage_name

    def save(self, latitude, longitude, stage_description):
        self.latitude = latitude
        self.longitude = longitude
        self.stage_description = stage_description

        db.session.add(self)
        db.session.commit()

    def change_stage_name(self, stage_name):
        self.stage_name = stage_name
        db.session.commit()

    def serialize(self):
        return {
            "stage_id": self.stage_id,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "stage_name": self.stage_name,
            "stage_description": self.stage_description,
        }
