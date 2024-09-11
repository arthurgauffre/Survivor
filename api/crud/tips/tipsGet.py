
from database.tableRelationships import Tips
from schemas.tipsSchemas import AllTipsSchema
from sqlalchemy.orm import Session


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
