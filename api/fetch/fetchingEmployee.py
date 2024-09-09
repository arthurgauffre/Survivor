from random import choice
import requests
from passwordOperations import getPasswordHash
from loginTokenRetriever import loginToken
from sqlalchemy.orm import Session
import os
from dotenv import load_dotenv

from database.tableRelationships import (Customer, Employee, EmployeeCustomer,
                                         User)

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
    response = {}
    try:
        response = requests.get(url, json=None, headers=headers)
    except BaseException:
        access_token = loginToken()
        getAllEmployees(access_token, db)

    if response.status_code == 401:
        access_token = loginToken()
        getAllEmployees(access_token, db)

    employeesData = response.json()

    for employee in employeesData:
        actualId = (employee.get('id')) + 100
        user = User(
            id=actualId,
            password=getPasswordHash(EMPLOYEE_PASSWORD),
            email=employee.get('email'),
            name=employee.get('name'),
            surname=employee.get('surname')
        )

        # existing_user = db.query(User).filter(
            # User.email == user.email).first()
        # if not existing_user:
        db.add(user)
        db.flush()

        employee = Employee(
            user_id=user.id,
        )
        db.add(employee)
        # else:
        #     existing_user.email = user.email
        #     existing_user.name = user.name
        #     existing_user.surname = user.surname
    db.commit()


def getEmployeeById(access_token, db):

    headers = {
        'accept': 'application/json',
        'X-Group-Authorization': TOKEN_API,
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token["access_token"],
    }
    employees = db.query(Employee).all()

    for employeeId in employees:
        actualId = (employeeId.user_id) - 100
        url = f'https://soul-connection.fr/api/employees/{actualId}'
        response = {}
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
            access_token = loginToken()
            getEmployeeById(access_token, db)

        user = db.query(User).filter(
            User.id == employeeId.user_id).first()
        user.email = employee_data.get('email')
        user.name = employee_data.get('name')
        user.surname = employee_data.get('surname')
        user.birthdate = employee_data.get('birth_date')
        user.gender = employee_data.get('gender')
        actualEmployee = db.query(Employee).filter(
            Employee.user_id == employeeId.user_id).first()
        actualEmployee.work = employee_data.get("work")
    db.commit()


def getEmployeeImg(access_token, db):

    headers = {
        'accept': 'application/json',
        'X-Group-Authorization': TOKEN_API,
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token["access_token"],
    }
    employees = db.query(Employee).all()

    for employeeId in employees:
        url = f'https://soul-connection.fr/api/employees/{
            employeeId.user_id}/image'
        try:
            response = requests.get(url, headers=headers)
        except BaseException:
            access_token = loginToken()
            getEmployeeImg(access_token, db)
        if response.status_code == 401:
            access_token = loginToken()
            getEmployeeImg(access_token, db)
        employee = db.query(Employee).filter(
            Employee.user_id == employeeId.user_id).first()
        img_path = f'./images/employees/{employee.user_id}.jpg'
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
