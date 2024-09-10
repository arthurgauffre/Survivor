from sqlalchemy.orm import Session

from database.tableRelationships import Encounter, Customer


def getEncounterForCustomer(db: Session, customer_id: int):
    customer = db.query(Customer).filter(Customer.user_id == customer_id).first()
    actualEncounterForActualUser = db.query(
        Encounter).filter(Encounter.customer_id == customer.id).all()

    listOfDataNeededForCustomer = []

    for actualUser in actualEncounterForActualUser:
        listOfDataNeededForCustomer.append(
            {
                "id": actualUser.id,
                "customer_id": customer.user_id,
                "date": actualUser.date,
                "rating": actualUser.rating,
                "comment": actualUser.comment,
                "source": actualUser.source,
            }
        )
    return listOfDataNeededForCustomer
