import requests
import os
from dotenv import load_dotenv

from loginTokenRetriever import loginToken
from api.database.tableRelationships import Customer

load_dotenv()

TOKEN_API = os.getenv("TOKEN_API")
AUTH_EMAIL = os.getenv("AUTH_EMAIL")
AUTH_PASSWORD = os.getenv("AUTH_PASSWORD")


def fetchingCustomersInfo(acccess_token, database):
    url = 'https://soul-connection.fr/api/customers'

    headers = {
        'accept': 'application/json',
        'X-Group-Authorization': TOKEN_API,
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + acccess_token["access_token"],
    }

    response = requests.get(url, json=None, headers=headers)

    if response.status_code == 401:
        acccess_token = loginToken()
        fetchingCustomersInfo(acccess_token)

    # Parse JSON response and create Customer instances
    customers_data = response.json()

    for customer_data in customers_data:
        # Create a new Customer object
        customer = Customer(
            id=customer_data.get('id'),
            email=customer_data.get('email'),
            password=customer_data.get('password'),
            name=customer_data.get('name'),
            surname=customer_data.get('surname'),
            birthdate=customer_data.get('birthdate'),
            gender=customer_data.get('gender'),
            description=customer_data.get('description'),
            astrologicalSign=customer_data.get('astrologicalSign'),
            clothesType=customer_data.get('clothesType'),
        )
        database.add(customer)
    database.commit()
    return response.json()
