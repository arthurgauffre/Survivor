from sqlalchemy.orm import Session

from schemas.customerSchemas import CustomerBasicSchema
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
                "phone_number": customer.phone_number,
                "address": customer.address
            }
        )
        # listOfAllCustomers.append(CustomerBasicSchema(
        #     id=customer.id,
        #     email=customer.email,
        #     name=customer.name,
        #     surname=customer.surname,
        #     birth_date=customer.birth_date,
        #     gender=customer.gender,
        #     description=customer.description,
        #     astrologicalSign=customer.astrologicalSign,
        #     phone_number=customer.phone_number,
        #     address=customer.address
        # ))
    return listOfAllCustomers


def getACustomer(db: Session, customer_id: int):
    customer = db.query(Customer).filter(Customer.id == customer_id).first()
    return CustomerBasicSchema(
        id=customer.id,
        name=customer.name,
        surname=customer.surname,
        email=customer.email,
        birthdate=customer.birthdate,
        gender=customer.gender,
        description=customer.description,
        astrologicalSign=customer.astrologicalSign,
        phone_number=customer.phone_number,
        address=customer.address
    )