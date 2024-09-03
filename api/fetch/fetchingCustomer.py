import requests
import os
from dotenv import load_dotenv

from loginTokenRetriever import loginToken
from database.tableRelationships import Customer

load_dotenv()

TOKEN_API = os.getenv("TOKEN_API")
AUTH_EMAIL = os.getenv("AUTH_EMAIL")
AUTH_PASSWORD = os.getenv("AUTH_PASSWORD")


def fetchingAllCustomer(acccess_token, database):
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
        fetchingAllCustomer(acccess_token)

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

        # Add the new customer to the customers table
        if not database.query(Customer).filter(
                Customer.id == customer.id).first():
            database.add(customer)

    # Commit the session to save all changes
    database.commit()
    return response.json()


def fetchingCustomerDetail(acccess_token, database):
    headers = {
        'accept': 'application/json',
        'X-Group-Authorization': TOKEN_API,
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + acccess_token["access_token"],
    }

    for customerId in database.query(Customer).all():
        url = f'https://soul-connection.fr/api/customers/{customerId.id}'
        response = requests.get(url, json=None, headers=headers)
        if response.status_code == 401:
            acccess_token = loginToken()
            fetchingCustomerDetail(acccess_token)
        customer_data = response.json()
        customer = database.query(Customer).filter(
            Customer.id == customerId.id).first()
        customer.email = customer_data.get('email')
        customer.password = customer_data.get('password')
        customer.name = customer_data.get('name')
        customer.surname = customer_data.get('surname')
        customer.birthdate = customer_data.get('birth_date')
        customer.gender = customer_data.get('gender')
        customer.description = customer_data.get('description')
        customer.astrologicalSign = customer_data.get('astrological_sign')

        image_url = f'https://soul-connection.fr/api/customers/{
            customer.id}/image'
        image_response = requests.get(image_url, headers=headers)

        if image_response.status_code == 401:
            acccess_token = loginToken()
            fetchingCustomerDetail(acccess_token)
        image_path = f'images/customers/{customer.id}.jpg'
        with open(image_path, 'wb') as image_file:
            image_file.write(image_response.content)

    database.commit()

    return response.json()
