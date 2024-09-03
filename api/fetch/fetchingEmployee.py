import requests
from loginTokenRetriever import loginToken
import os
from dotenv import load_dotenv

from database.tableRelationships import Employee

load_dotenv()


TOKEN_API = os.getenv("TOKEN_API")


def getAllEmployees(access_token, db):
    url = 'https://soul-connection.fr/api/employees'

    headers = {
        'accept': 'application/json',
        'X-Group-Authorization': TOKEN_API,
        'Authorization': 'Bearer ' + access_token["access_token"],
    }

    response = requests.get(url, headers=headers)

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
        response = requests.get(url, headers=headers)
        if response.status_code == 401:
            access_token = loginToken()
            getEmployeeById(access_token, db)
        employee_data = response.json()
        actualEmployee = db.query(Employee).filter(
            Employee.id == employeeId.id).first()
        actualEmployee.email = employee_data.get("email")
        actualEmployee.name = employee_data.get("name")
        actualEmployee.surname = employee_data.get("surname")
        actualEmployee.birthdate = employee_data.get("birthdate")
        actualEmployee.gender = employee_data.get("gender")
        actualEmployee.work = employee_data.get("work")
    db.commit()
    return response.json()
