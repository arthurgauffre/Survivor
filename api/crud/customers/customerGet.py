from sqlalchemy.orm import Session

from database.tableRelationships import Customer


def getAllRealCustomers(db: Session):
    customers = db.query(Customer).all()
    listOfAllCustomers = []

    for customer in customers:
        listOfAllCustomers.append(
            {
                "id": customer.id,
                "name": customer.name,
                "surname": customer.surname,
                "email": customer.email,
                "birthdate": customer.birthdate,
                "gender": customer.gender,
                "description": customer.description,
                "astrologicalSign": customer.astrologicalSign,
            }
        )
    return listOfAllCustomers
