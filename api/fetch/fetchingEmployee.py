from random import choice
import requests
from passwordOperations import getPasswordHash
from loginTokenRetriever import loginToken
from sqlalchemy.orm import Session
import os
from dotenv import load_dotenv

from database.tableRelationships import Customer, Employee, EmployeeCustomer

load_dotenv()


TOKEN_API = os.getenv("TOKEN_API")
EMPLOYEE_PASSWORD = os.getenv("FAKE_EMPLOYEE_PASSWORD")


def getAllEmployees(access_token, db):
    url = 'https://soul-connection.fr/api/employees'

    headers = {
        'accept': 'application/json',
        'X-Group-Authorization': TOKEN_API,
        'Authorization': 'Bearer ' + access_token["access_token"],
    }

    try:
        response = requests.get(url, headers=headers)
    except BaseException:
        access_token = loginToken()
        getAllEmployees(access_token, db)

    if response.status_code == 401:
        access_token = loginToken()
        getAllEmployees(access_token, db)

    for employee in response.json():
        employee = Employee(
            id=employee["id"],
            email=employee["email"],
            name=employee["name"],
            surname=employee["surname"],
        )
        if not db.query(Employee).filter(
                Employee.id == employee.id).first():
            db.add(employee)
        else:
            currentEmployee = db.query(Employee).filter(
                Employee.id == employee.id).first()
            currentEmployee.email = employee.email
            currentEmployee.name = employee.name
            currentEmployee.surname = employee.surname
        db.commit()

    return response.json()


def getEmployeeById(access_token, db):

    headers = {
        'accept': 'application/json',
        'X-Group-Authorization': TOKEN_API,
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token["access_token"],
    }


    for employeeId in db.query(Employee).all():
        url = f'https://soul-connection.fr/api/employees/{employeeId.id}'
        try:
            response = requests.get(url, headers=headers)
        except BaseException:
            access_token = loginToken()
            getEmployeeById(access_token, db)
        if response.status_code == 401:
            access_token = loginToken()
            getEmployeeById(access_token, db)
        try:
            employee_data = response.json()
        except BaseException:
            # access_token = loginToken()
            # getEmployeeById(access_token, db)
            pass
        actualEmployee = db.query(Employee).filter(
            Employee.id == employeeId.id).first()
        actualEmployee.password = getPasswordHash(EMPLOYEE_PASSWORD)
        actualEmployee.email = employee_data.get("email")
        actualEmployee.name = employee_data.get("name")
        actualEmployee.surname = employee_data.get("surname")
        actualEmployee.birthdate = employee_data.get("birth_date")
        actualEmployee.gender = employee_data.get("gender")
        actualEmployee.work = employee_data.get("work")
    db.commit()
    return response.json()


def getEmployeeImg(access_token, db):

    headers = {
        'accept': 'application/json',
        'X-Group-Authorization': TOKEN_API,
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token["access_token"],
    }

    for employeeId in db.query(Employee).all():
        url = f'https://soul-connection.fr/api/employees/{employeeId.id}/image'
        try:
            response = requests.get(url, headers=headers)
        except BaseException:
            access_token = loginToken()
            getEmployeeImg(access_token, db)
        if response.status_code == 401:
            access_token = loginToken()
            getEmployeeImg(access_token, db)
        employee = db.query(Employee).filter(
            Employee.id == employeeId.id).first()
        img_path = f'./images/employees/{employee.id}.jpg'
        with open(img_path, 'wb') as file:
            file.write(response.content)
    return {"message": "Images downloaded"}


def fillingEmployeeCustomerTable(db: Session):
    allEmployees = db.query(Employee).all()
    allCustomers = db.query(Customer).all()

    listOfAllEmployeesId = []

    for employeeId in allEmployees:
        listOfAllEmployeesId.append(employeeId.id)

    for customer in allCustomers:
        relation = EmployeeCustomer(
            employee_id=choice(listOfAllEmployeesId),
            customer_id=customer.id
        )
        db.add(relation)
    db.commit()
