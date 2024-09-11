import base64

from database.tableRelationships import (Customer, Employee, EmployeeCustomer,
                                         User)
from fastapi import HTTPException
from schemas.employeeSchemas import EmployeePersonalInfoSchema
from sqlalchemy.orm import Session


def getAllRealEmployees(db: Session):
    employees = db.query(Employee).all()
    listOfAllEmployees = []
    listOfCustomers = []

    for employee in employees:
        user = db.query(User).filter(
            User.id == employee.user_id).first()
        actualEmployee = db.query(Employee).filter(
            Employee.user_id == user.id).first()
        relationEmployeeCustomers = db.query(EmployeeCustomer).filter(
            EmployeeCustomer.employee_id == actualEmployee.id).all()
        for relation in relationEmployeeCustomers:
            customer = db.query(Customer).filter(
                Customer.id == relation.customer_id).first()
            listOfCustomers.append(customer.user_id)
        listOfAllEmployees.append(
            {
                "id": employee.user_id,
                "name": user.name,
                "surname": user.surname,
                "email": user.email,
                "birthdate": user.birthdate,
                "gender": user.gender,
                "work": employee.work,
                "customer_list": listOfCustomers
            }
        )
    return listOfAllEmployees


def getAnEmployeePersonalInfos(db: Session, employee_id: int):
    listOfCustomers = []
    user = db.query(User).filter(
        User.id == employee_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Employee not found")
    actualEmployee = db.query(Employee).filter(
        Employee.user_id == user.id).first()
    if not actualEmployee:
        raise HTTPException(status_code=404, detail="Employee not found")
    relationEmployeeCustomers = db.query(EmployeeCustomer).filter(
        EmployeeCustomer.employee_id == actualEmployee.id).all()
    for relation in relationEmployeeCustomers:
        customer = db.query(Customer).filter(
            Customer.id == relation.customer_id).first()
        listOfCustomers.append(customer.user_id)
    employeeInfos = EmployeePersonalInfoSchema(
        id=actualEmployee.user_id,
        email=user.email,
        name=user.name,
        surname=user.surname,
        birthdate=user.birthdate,
        gender=user.gender,
        work=actualEmployee.work,
        customer_list=listOfCustomers
    )
    return employeeInfos


def getCurrentEmployeeImg(db: Session, employee_id: int):
    user = db.query(User).filter(
        User.id == employee_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Employee not found")
    if not user.img_profil_content:
        return None
    return base64.b64encode(user.img_profil_content).decode("utf-8")
