import requests
import os
from dotenv import load_dotenv

from schemas.accessToken import AccessToken

load_dotenv()


TOKEN_API: str = os.getenv("TOKEN_API")
AUTH_EMAIL: str = os.getenv("AUTH_EMAIL")
AUTH_PASSWORD: str = os.getenv("AUTH_PASSWORD")


def loginToken() -> AccessToken:
    url: str = 'https://soul-connection.fr/api/employees/login'

    headers: dict[str, str] = {
        'accept': 'application/json',
        'X-Group-Authorization': TOKEN_API,
        'Content-Type': 'application/json',
    }

    data: dict[str, str] = {
        "email": AUTH_EMAIL,
        "password": AUTH_PASSWORD,
    }

    try:
        response: requests.models.Response = requests.post(
            url, json=data, headers=headers)
    except BaseException:
        return {}

    return response.json()
