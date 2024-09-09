from random import choice
import requests
from passwordOperations import getPasswordHash
from loginTokenRetriever import loginToken
from sqlalchemy.orm import Session
import os, base64
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
    image_response = ""
    headers = {
        'accept': 'application/json',
        'X-Group-Authorization': TOKEN_API,
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token["access_token"],
    }

    for employee in db.query(Employee).all():
        url = f'https://soul-connection.fr/api/employees/{employee.id}/image'
        try:
            image_response = requests.get(url, headers=headers)
        except Exception as e:
            print(f"Error fetching image: {e}")
            continue
        if image_response.status_code == 401:
            acccess_token = loginToken()  # Assuming loginToken() refreshes the token
            return getEmployeeImg(acccess_token, db)

        if image_response.status_code == 200:
            employee.img_profil_content = image_response
        else:
            print(f"Failed to retrieve image. Status code: {image_response.status_code}")


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
