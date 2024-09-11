import base64
from database.tableRelationships import (Customer, Employee, EmployeeCustomer,
                                         PayementHistory, User)
from fastapi import HTTPException
from schemas.customerSchemas import CustomerWithCoachSchema
from schemas.paymentsHistorySchemas import PaymentHistorySchema
from sqlalchemy.orm import Session


def getAllRealCustomers(db: Session):
    customers = db.query(Customer).all()

    listOfAllCustomers = []

    for customer in customers:
        user = db.query(User).filter(
            User.id == customer.user_id).first()
        listOfAllCustomers.append(
            {
                "id": customer.user_id,
                "name": user.name,
                "surname": user.surname,
                "email": user.email,
                "birthdate": user.birthdate,
                "gender": user.gender,
                "description": customer.description,
                "astrologicalSign": customer.astrologicalSign,
                "phone_number": customer.phone_number,
                "address": customer.address
            }
        )
    return listOfAllCustomers


def getACustomer(db: Session, customer_id: int):
    coachId = None
    customer = db.query(Customer).filter(
        Customer.user_id == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    user = db.query(User).filter(
        User.id == customer.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    employeeLinked = db.query(EmployeeCustomer).filter(
        EmployeeCustomer.customer_id == customer.id).first()
    employee = db.query(Employee).filter(
        Employee.id == employeeLinked.employee_id).first()
    if employee:
        coachId = employee.user_id
    return CustomerWithCoachSchema(
        id=customer.user_id,
        name=user.name,
        surname=user.surname,
        email=user.email,
        birthdate=user.birthdate,
        gender=user.gender,
        description=customer.description,
        astrologicalSign=customer.astrologicalSign,
        phone_number=customer.phone_number,
        address=customer.address,
        linkedCoach=coachId
    )


def getCurrentCustomerImg(db: Session, customer_id: int):
    user = db.query(User).filter(
        User.id == customer_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Customer not found")
    if not user.img_profil_content:
        return None
    return base64.b64encode(user.img_profil_content).decode("utf-8")


def getCustomerPaymentHistory(db: Session, customer_id: int):
    customer = db.query(Customer).filter(
        Customer.user_id == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    payementHistory = db.query(PayementHistory).filter(
        PayementHistory.customer_id == customer.id).all()
    if not payementHistory:
        raise HTTPException(status_code=404,
                            detail="No payment history found for this customer")
    AllpayementHistory = []
    for payement in payementHistory:
        AllpayementHistory.append(PaymentHistorySchema(
            id=payement.id,
            customer_id=customer.user_id,
            date=payement.date,
            amount=payement.amount,
            comment=payement.comment,
            payment_method=payement.payment_method
        ))
    if not AllpayementHistory:
        raise HTTPException(status_code=404, detail="Customer not found")
    return AllpayementHistory
