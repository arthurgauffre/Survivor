from random import choice
import requests
from passwordOperations import getPasswordHash
from loginTokenRetriever import loginToken
from sqlalchemy.orm import Session
import os, base64
from dotenv import load_dotenv
from concurrent.futures import ThreadPoolExecutor
from fetch.fetchingCustomer import SessionFactory

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


def fetchEmployeeDetail(employee, access_token):
    session = SessionFactory()  # Create a new session for each thread

    headers = {
        'accept': 'application/json',
        'X-Group-Authorization': TOKEN_API,
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token["access_token"],
    }

    try:
        # Fetch employee details
        url = f'https://soul-connection.fr/api/employees/{employee.id}'
        response = requests.get(url, headers=headers)
        if response.status_code == 401:
            access_token = loginToken()
            return fetchEmployeeDetail(employee, access_token)

        employee_data = response.json()

        # Update employee details in the database
        actualEmployee = session.query(Employee).filter(Employee.id == employee.id).first()
        if actualEmployee:
            actualEmployee.password = getPasswordHash(EMPLOYEE_PASSWORD)
            actualEmployee.email = employee_data.get("email")
            actualEmployee.name = employee_data.get("name")
            actualEmployee.surname = employee_data.get("surname")
            actualEmployee.birthdate = employee_data.get("birth_date")
            actualEmployee.gender = employee_data.get("gender")
            actualEmployee.work = employee_data.get("work")
        
        # Fetch employee image
        image_url = f'https://soul-connection.fr/api/employees/{employee.id}/image'
        image_response = requests.get(image_url, headers=headers)
        if image_response.status_code == 200:
            actualEmployee.img_profil_content = image_response.content
        elif image_response.status_code == 401:
            access_token = loginToken()
            return fetchEmployeeDetail(employee, access_token)
        else:
            print(f"Failed to retrieve image for employee {employee.id}. Status code: {image_response.status_code}")

        session.commit()
    except Exception as e:
        print(f"Error fetching or updating employee {employee.id}: {e}")
        session.rollback()
    finally:
        session.close()

def getEmployeeDetail(access_token, db):
    headers = {
        'accept': 'application/json',
        'X-Group-Authorization': TOKEN_API,
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token["access_token"],
    }

    employees = db.query(Employee).all()

    # Use ThreadPoolExecutor to process employees in parallel
    with ThreadPoolExecutor(max_workers=max(1, os.cpu_count() - 4)) as executor:
        futures = [
            executor.submit(fetchEmployeeDetail, employee, access_token)
            for employee in employees
        ]

        # Wait for all threads to complete
        for future in futures:
            try:
                future.result()  # This will raise exceptions if any occurred during thread execution
            except Exception as e:
                print(f"Error in thread: {e}")

    return {"message": "All employee details fetched and updated successfully"}


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
