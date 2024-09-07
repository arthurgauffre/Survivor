import os
import random
from fastapi import HTTPException
from sqlalchemy.orm import Session

from schemas.employeeSchemas import EmployeePersonalInfoSchema
from database.tableRelationships import Customer, Employee, EmployeeCustomer


def getAllRealEmployees(db: Session):
    employees = db.query(Employee).all()
    listOfAllEmployees = []

    for employee in employees:
        listOfAllEmployees.append(
            {
                "id": employee.id,
                "name": employee.name,
                "surname": employee.surname,
                "email": employee.email,
                "birthdate": employee.birthdate,
                "gender": employee.gender,
                "work": employee.work,
                "customer_list": []
            }
        )
    return listOfAllEmployees


def getAnEmployeePersonalInfos(db: Session, employee_id: int):
    actualEmployee = db.query(Employee).filter(
        Employee.id == employee_id).first()
    relationEmployeeCustomers = db.query(EmployeeCustomer).filter(
        EmployeeCustomer.employee_id == employee_id).all()
    employeeInfos = EmployeePersonalInfoSchema(
        id=actualEmployee.id,
        email=actualEmployee.email,
        name=actualEmployee.name,
        surname=actualEmployee.surname,
        birthdate=actualEmployee.birthdate,
        gender=actualEmployee.gender,
        work=actualEmployee.work,
        customer_list=[relation.customer_id for relation in relationEmployeeCustomers if relation.employee_id == employee_id]
    )
    return employeeInfos


def getCurrentEmployeeImg(db: Session, employee_id: int):
    image_path = f"/app/api/images/employees/{employee_id}.jpg"

    if not os.path.exists(image_path):
        raise HTTPException(status_code=404, detail="Image not found")

    image_url = f"http://fastapi:8000/static/employees/{employee_id}.jpg"
    return {"image_url": image_url}


def getListOfCustomerForEmployee(db: Session, employee_id: int):
    actualEmployee = db.query(Employee).filter(
        Employee.id == employee_id).first()
    allCustomers = db.query(Customer).all()
    listOfCustomers = []
    listOfAllCustomersId = []

    for customerId in allCustomers:
        listOfAllCustomersId.append(customerId.id)

    for i in range(random.randint(3, 15)):
        listOfCustomers.append(random.choice(listOfAllCustomersId))
    return listOfCustomers
