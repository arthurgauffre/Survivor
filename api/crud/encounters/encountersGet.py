from fastapi import HTTPException
from sqlalchemy.orm import Session

from schemas.encounterSchemas import EncounterByCustomerSchema
from database.tableRelationships import Customer, Encounter


def getEncounterForCustomer(db: Session, customer_id: int):
    customer = db.query(Customer).filter(
        Customer.user_id == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    actualEncounterForActualUser = db.query(
        Encounter).filter(
            Encounter.customer_id == customer.id).all()
    if not actualEncounterForActualUser:
        raise HTTPException(
            status_code=404, detail="No encounter found for this customer")

    listOfDataNeededForCustomer = []

    for actualUser in actualEncounterForActualUser:
        customer = db.query(Customer).filter(
            Customer.user_id == customer_id).first()
        listOfDataNeededForCustomer.append(EncounterByCustomerSchema(
            id=actualUser.id,
            customer_id=customer.user_id,
            date=actualUser.date,
            rating=actualUser.rating,
            comment=actualUser.comment,
            source=actualUser.source
        ))
    return listOfDataNeededForCustomer
