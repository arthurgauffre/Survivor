import os
from fastapi import HTTPException
from sqlalchemy.orm import Session

from schemas.customerSchemas import CustomerBasicSchema
from schemas.paymentsHistorySchemas import PaymentHistorySchema
from database.tableRelationships import Customer, PayementHistory

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

def getCurrentCustomerImg(db: Session, customer_id: int):
    image_path = f"/app/api/images/employees/{customer_id}.jpg"

    if not os.path.exists(image_path):
        image_url = None

    image_url = f"http://fastapi:8000/static/customers/{customer_id}.jpg"
    return {"image_url": image_url}

def getCustomerPaymentHistory(db: Session, customer_id: int):
    payementHistory = db.query(PayementHistory).filter(
        PayementHistory.customer_id == customer_id).all()
    AllpayementHistory = []
    for payement in payementHistory:
        AllpayementHistory.append(PaymentHistorySchema
        (
            id=payement.id,
            customer_id=payement.customer_id,
            date=payement.date,
            amount=payement.amount,
            comment=payement.comment,
            payment_method=payement.payment_method
        ))
    if not AllpayementHistory:
        raise HTTPException(status_code=404, detail="Customer not found")
    return AllpayementHistory