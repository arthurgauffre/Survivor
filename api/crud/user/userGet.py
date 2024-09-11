from database.tableRelationships import User
from sqlalchemy.orm import Session


def getUser(db: Session, email: str):
    user = db.query(User).filter(
        User.email == email).first()
    if user:
        return user
    return None
