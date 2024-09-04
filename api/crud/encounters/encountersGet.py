from sqlalchemy.orm import Session

from database.tableRelationships import Encounter


def getEncounterForCustomer(db: Session, customer_id: int):
    actualEncounterForActualUser = db.query(
        Encounter).filter(Encounter.customer_id == customer_id).all()

    listOfDataNeededForCustomer = []

    for actualUser in actualEncounterForActualUser:
        listOfDataNeededForCustomer.append(
            {
                "id": actualUser.id,
                "customer_id": actualUser.customer_id,
                "date": actualUser.date,
                "rating": actualUser.rating,
                "comment": actualUser.comment,
                "source": actualUser.source,
            }
        )
    return listOfDataNeededForCustomer
