import os

import requests
from dotenv import load_dotenv

load_dotenv()


TOKEN_API = os.getenv("TOKEN_API")
AUTH_EMAIL = os.getenv("AUTH_EMAIL")
AUTH_PASSWORD = os.getenv("AUTH_PASSWORD")


def loginToken():
    url = 'https://soul-connection.fr/api/employees/login'

    headers = {
        'accept': 'application/json',
        'X-Group-Authorization': TOKEN_API,
        'Content-Type': 'application/json',
    }

    data = {
        "email": AUTH_EMAIL,
        "password": AUTH_PASSWORD,
    }
    response = {}
    finalResponse = {}
    try:
        response = requests.post(url, json=data, headers=headers)
        finalResponse = response.json()
    except BaseException:
        return {}

    return finalResponse
