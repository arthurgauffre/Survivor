import requests
from loginTokenRetriever import loginToken
import os
from dotenv import load_dotenv

from api.database.tableRelationships import Employee

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
            user_id=employee["id"],
            email=employee["email"],
            name=employee["name"],
            surname=employee["surname"],
        )
        db.add(employee)
        db.commit()

    return response.json()
