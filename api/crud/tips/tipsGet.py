
from sqlalchemy.orm import Session

from schemas.tipsSchemas import AllTipsSchema
from database.tableRelationships import Tips


def getAllTips(db: Session):
    allTips = db.query(Tips).all()
    listOfTips = []

    for tip in allTips:
        listOfTips.append(AllTipsSchema(
            id=tip.id,
            title=tip.title,
            tip=tip.tip
        ))
    return listOfTips
