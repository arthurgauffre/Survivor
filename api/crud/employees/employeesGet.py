import base64
import random
from fastapi import HTTPException
from sqlalchemy.orm import Session

from schemas.employeeSchemas import EmployeePersonalInfoSchema
from database.tableRelationships import Customer, Employee, EmployeeCustomer, User


def getAllRealEmployees(db: Session):
    employees = db.query(Employee).all()
    listOfAllEmployees = []

    for employee in employees:
        user = db.query(User).filter(
            User.id == employee.user_id).first()
        listOfAllEmployees.append(
            {
                "id": employee.user_id,
                "name": user.name,
                "surname": user.surname,
                "email": user.email,
                "birthdate": user.birthdate,
                "gender": user.gender,
                "work": employee.work,
                "customer_list": []
            }
        )
    return listOfAllEmployees


def getAnEmployeePersonalInfos(db: Session, employee_id: int):
    newEmployeeId = employee_id + 100
    listOfCustomers = []
    user = db.query(User).filter(
        User.id == newEmployeeId).first()
    actualEmployee = db.query(Employee).filter(
        Employee.user_id == user.id).first()
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
    newEmployeeId = employee_id + 100
    employee = db.query(Employee).filter(
        Employee.user_id == newEmployeeId).first()
    user = db.query(User).filter(
        User.id == employee.user_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return base64.b64encode(user.img_profil_content).decode("utf-8")


def getListOfCustomerForEmployee(db: Session, employee_id: int):
    newEmployeeId = employee_id + 100
    # user = db.query(User).filter(
    #         User.id == newEmployeeId).first()
    actualEmployee = db.query(Employee).filter(
        Employee.user_id == newEmployeeId).first()
    allCustomers = db.query(EmployeeCustomer).all()
    listOfCustomers = []

    for customer in allCustomers:
        customer = db.query(Customer).filter(
            Customer.id == customer.customer_id).first()
        if customer.employee_id == actualEmployee.id:
            listOfCustomers.append(customer.user_id)

    return listOfCustomers
