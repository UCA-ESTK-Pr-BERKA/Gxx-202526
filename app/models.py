from datetime import datetime, timezone
from . import db


def _now():
    return datetime.now(timezone.utc)


class Item(db.Model):
    """Example model – replace or extend with your own tables."""
    __tablename__ = 'items'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), default=_now)

    def __repr__(self):
        return f'<Item {self.title}>'

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }
