import requests
import os
from dotenv import load_dotenv

from passwordOperations import getPasswordHash
from loginTokenRetriever import loginToken
from database.tableRelationships import (Customer,
                                         PayementHistory, Clothes, User)

# from concurrent.futures import ThreadPoolExecutor
# from sqlalchemy.exc import SQLAlchemyError
# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker

load_dotenv()

TOKEN_API = os.getenv("TOKEN_API")
AUTH_EMAIL = os.getenv("AUTH_EMAIL")
AUTH_PASSWORD = os.getenv("AUTH_PASSWORD")
CUSTOMER_PASSWORD = os.getenv("FAKE_CUSTOMER_PASSWORD")


def fetchingAllCustomer(acccess_token, database):
    url = 'https://soul-connection.fr/api/customers'

    headers = {
        'accept': 'application/json',
        'X-Group-Authorization': TOKEN_API,
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + acccess_token["access_token"],
    }

    response = {}
    try:
        response = requests.get(url, json=None, headers=headers)
    except BaseException:
        acccess_token = loginToken()
        fetchingAllCustomer(acccess_token, database)

    if response.status_code == 401:
        acccess_token = loginToken()
        fetchingAllCustomer(acccess_token)

    customers_data = response.json()

    for customer_data in customers_data:
        user = User(
            # id=customer_data.get('id'),
            password=getPasswordHash(CUSTOMER_PASSWORD),
            email=customer_data.get('email'),
            name=customer_data.get('name'),
            surname=customer_data.get('surname')
        )

        # existing_user = database.query(User).filter(
        #     User.email == user.email).first()

        # if not existing_user:
        database.add(user)
        database.flush()  # This will assign an id to the user

        customer = Customer(
            user_id=user.id  # Use the generated user.id
        )
        database.add(customer)
        # else:
        #     existing_user.email = user.email
        #     existing_user.name = user.name
        #     existing_user.surname = user.surname

        # if not database.query(User).filter(
        #         User.id == user.id).first():
        #     database.add(user)
        #     database.add(customer)
        # else:
        #     currentUser = database.query(User).filter(
        #         User.id == user.id)
        #     currentUser.email = user.email
        #     currentUser.name = user.name
        #     currentUser.surname = user.surname
    # for customer_data in customers_data:
    #     customer = Customer(
    #         id=customer_data.get('id'),
    #         password=getPasswordHash(CUSTOMER_PASSWORD),
    #         email=customer_data.get('email'),
    #         name=customer_data.get('name'),
    #         surname=customer_data.get('surname')
    #     )

    #     if not database.query(Customer).filter(
    #             Customer.id == customer.id).first():
    #         database.add(customer)
    #     else:
    #         currentCustomer = database.query(Customer).filter(
    #             Customer.id == customer.id)
    #         currentCustomer.email = customer.email
    #         currentCustomer.name = customer.name
    #         currentCustomer.surname = customer.surname

    database.commit()
    return {"message": "All customers have been fetched"}


def fetchingCustomerDetail(acccess_token, database):
    headers = {
        'accept': 'application/json',
        'X-Group-Authorization': TOKEN_API,
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + acccess_token["access_token"],
    }

    customers = database.query(Customer).all()

    for customerId in customers:
        url = f'https://soul-connection.fr/api/customers/{customerId.user_id}'
        getCustomerDetail(url, headers, customerId, database)
        database.commit()
        # getCustomerImage(acccess_token, customerId, headers, database)
        # database.commit()
        getCustomerPaymentHistory(customerId, headers, database)
        database.commit()
        # getClothesImage(customerId, database, headers)
        # database.commit()

    return {"message": "All customers have been fetched"}


def getCustomerDetail(url, headers, customerId, database):
    response = {}
    try:
        response = requests.get(url, headers=headers)
    except BaseException:
        getCustomerDetail(url, headers, customerId, database)

    if response.status_code == 401:
        # acccess_token = loginToken()
        getCustomerDetail(url, headers, customerId, database)
    customer_data = {}
    try:
        customer_data = response.json()
    except BaseException:
        # acccess_token = loginToken()
        getCustomerDetail(url, headers, customerId, database)

    user = database.query(User).filter(
        User.id == customerId.user_id).first()
    user.email = customer_data.get('email')
    user.name = customer_data.get('name')
    user.surname = customer_data.get('surname')
    user.birthdate = customer_data.get('birth_date')
    user.gender = customer_data.get('gender')
    customer = database.query(Customer).filter(
        Customer.user_id == customerId.user_id).first()
    customer.description = customer_data.get('description')
    customer.astrologicalSign = customer_data.get('astrological_sign')
    customer.phone_number = customer_data.get('phone_number')
    customer.address = customer_data.get('address')


def getCustomerImage(acccess_token, customerId, headers, database):
    customer = database.query(Customer).filter(
        Customer.user_id == customerId.user_id).first()
    image_url = f'https://soul-connection.fr/api/customers/{
            customer.id}/image'
    try:
        image_response = requests.get(image_url, headers=headers)
    except BaseException:
        getCustomerImage(acccess_token, customerId, headers, database)

    if image_response.status_code == 401:
        acccess_token = loginToken()
        getCustomerImage(acccess_token, customerId, headers)
    image_path = f'images/customers/{customer.id}.jpg'
    with open(image_path, 'wb') as image_file:
        image_file.write(image_response.content)


def getCustomerPaymentHistory(customerId, headers, database):
    customer = database.query(Customer).filter(
        Customer.user_id == customerId.user_id).first()
    payement_history_url = f'https://soul-connection.fr/api/customers/{customer.user_id}/payments_history'
    payement_history_response = {}
    try:
        payement_history_response = requests.get(
            payement_history_url, headers=headers)
    except BaseException:
        getCustomerPaymentHistory(customerId, headers, database)
    if payement_history_response.status_code == 401:
        # acccess_token = loginToken()
        getCustomerPaymentHistory(customerId, headers, database)
    payement_history_datas = {}
    try:
        payement_history_datas = payement_history_response.json()
    except BaseException:
        # acccess_token = loginToken()
        getCustomerPaymentHistory(customerId, headers, database)

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
        else:
            currentPayementHistory = database.query(PayementHistory).filter(
                PayementHistory.id == payement_history.id)
            currentPayementHistory.date = payement_history.date
            currentPayementHistory.amount = payement_history.amount
            currentPayementHistory.comment = payement_history.comment
            currentPayementHistory.payment_method = payement_history.payment_method


def getClothesImage(customerId, database, headers):
    # try:
    clothes_data = {}
    clothe_image_response = ""
    clothes_response = ""
    customer = database.query(Customer).filter(
        Customer.user_id == customerId.user_id).first()
    clothes_url = f'https://soul-connection.fr/api/customers/{
        customer.id}/clothes'
    try:
        clothes_response = requests.get(clothes_url, headers=headers)
    except BaseException:
        getClothesImage(customerId, database, headers)

    clothes_datas = {}
    if clothes_response.status_code == 401:
        acccess_token = loginToken()
        getClothesImage(customer, database, headers)
    try:
        clothes_datas = clothes_response.json()
    except BaseException:
        pass
    if database.query(Clothes).filter(
            Clothes.customer_id == customer.id).first():
        database.query(Clothes).filter(
            Clothes.customer_id == customer.id).delete()
    for clothes_data in clothes_datas:
        clothe_image = f'https://soul-connection.fr/api/clothes/{
            clothes_data.get("id")}/image'
        try:
            clothe_image_response = requests.get(clothe_image, headers=headers)
        except BaseException:
            getClothesImage(customerId, database, headers)
        if not (isinstance(clothe_image_response, requests.models.Response)):
            # TODO
            pass
        if clothe_image_response.status_code == 401:
            # acccess_token = loginToken()
            getClothesImage(customerId, database, headers)
        clothe_image_path = f'images/clothes/{clothes_data.get("id")}.jpg'
        with open(clothe_image_path, 'wb') as image_file:
            image_file.write(clothe_image_response.content)

        specificClothes = Clothes(
            customer_id=customer.id,
            id=clothes_data.get('id'),
            type=clothes_data.get('type'),
        )
        if not database.query(Clothes).filter(
                Clothes.id == clothes_data.get('id')).first():
            database.add(specificClothes)
        else:
            currentClothe = database.query(Clothes).filter(
                Clothes.id == specificClothes.id)
            currentClothe.customer_id = specificClothes.customer_id
            currentClothe.type = specificClothes.type
    # except ConnectionError as e:
    #     print("An error from the soul-connection API has occurred:", e)
