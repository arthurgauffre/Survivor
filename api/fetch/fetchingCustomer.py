import requests
import os
from dotenv import load_dotenv

from loginTokenRetriever import loginToken
from database.tableRelationships import Customer, PayementHistory, Clothes

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
        customer = getCustomerDetail(url, headers, customerId, database)
        database.commit()
        getCustomerImage(acccess_token, customer, headers)
        database.commit()
        getCustomerPaymentHistory(customer, headers, database)
        database.commit()
        getClothesImage(customer, database, headers)
        database.commit()

    return { "message": "All customers have been fetched" }


def getCustomerDetail(url, headers, customerId, database):
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
    return customer


def getCustomerImage(acccess_token, customer, headers):
    image_url = f'https://soul-connection.fr/api/customers/{
            customer.id}/image'
    image_response = requests.get(image_url, headers=headers)

    if image_response.status_code == 401:
        acccess_token = loginToken()
        fetchingCustomerDetail(acccess_token)
    image_path = f'images/customers/{customer.id}.jpg'
    with open(image_path, 'wb') as image_file:
        image_file.write(image_response.content)


def getCustomerPaymentHistory(customer, headers, database):
    payement_history_url = f'https://soul-connection.fr/api/customers/{
            customer.id}/payments_history'
    payement_history_response = requests.get(
        payement_history_url, headers=headers)
    if payement_history_response.status_code == 401:
        acccess_token = loginToken()
        fetchingCustomerDetail(acccess_token)
    payement_history_datas = payement_history_response.json()
    if database.query(PayementHistory).filter(
            PayementHistory.customer_id == customer.id).first():
        database.query(PayementHistory).filter(
            PayementHistory.customer_id == customer.id).delete()
    for payment_history_date in payement_history_datas:
        payement_history = PayementHistory(
            customer_id=customer.id,
            id=payment_history_date.get('id'),
            date=payment_history_date.get('date'),
            amount=payment_history_date.get('amount'),
            comment=payment_history_date.get('comment'),
            payment_method=payment_history_date.get('payment_method')
        )
        if not database.query(PayementHistory).filter(
                PayementHistory.id == payement_history.id).first():
            database.add(payement_history)


def getClothesImage(customer, database, headers):
    clothes_url = f'https://soul-connection.fr/api/customers/{
        customer.id}/clothes'
    clothes_response = requests.get(clothes_url, headers=headers)
    if clothes_response.status_code == 401:
        acccess_token = loginToken()
        fetchingCustomerDetail(acccess_token)
    clothes_datas = clothes_response.json()
    if database.query(Clothes).filter(
            Clothes.customer_id == customer.id).first():
        database.query(Clothes).filter(
            Clothes.customer_id == customer.id).delete()
    for clothes_data in clothes_datas:
        clothe_image = f'https://soul-connection.fr/api/clothes/{
            clothes_data.get("id")}/image'
        clothe_image_response = requests.get(clothe_image, headers=headers)
        if clothe_image_response.status_code == 401:
            acccess_token = loginToken()
            fetchingCustomerDetail(acccess_token)
        clothe_image_path = f'images/clothes/{clothes_data.get("id")}.jpg'
        with open(clothe_image_path, 'wb') as image_file:
            image_file.write(clothe_image_response.content)

        clothe = Clothes(
            customer_id=customer.id,
            id=clothes_data.get('id'),
            type=clothes_data.get('type'),
        )
        if not database.query(Clothes).filter(
                Clothes.id == clothes_data.get('id')).first():
            database.add(clothe)