from json import JSONDecodeError
import requests
import os
from dotenv import load_dotenv

from schemas.employeeSchemas import EmployeeBaseSchema
from loginTokenRetriever import loginToken
from database.tableRelationships import Customer, PayementHistory, Clothes

# from concurrent.futures import ThreadPoolExecutor
# from sqlalchemy.exc import SQLAlchemyError
# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker
from requests.exceptions import ConnectionError

load_dotenv()

TOKEN_API: str = os.getenv("TOKEN_API")
AUTH_EMAIL: str = os.getenv("AUTH_EMAIL")
AUTH_PASSWORD: str = os.getenv("AUTH_PASSWORD")


def fetchingAllCustomer(access_token, database) -> dict:
    url: str = 'https://soul-connection.fr/api/customers'

    headers: dict[str, str] = {
        'accept': 'application/json',
        'X-Group-Authorization': TOKEN_API,
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token["access_token"],
    }

    try:
        response: requests.models.Response = requests.get(
            url, json=None, headers=headers)
    except BaseException:
        access_token: dict = loginToken()
        fetchingAllCustomer(access_token, database)

    if response.status_code == 401:
        access_token: dict = loginToken()
        fetchingAllCustomer(access_token)

    customers_data: list[EmployeeBaseSchema] = response.json()

    for customer_data in customers_data:
        customer = Customer(
            id=customer_data.get('id'),
            email=customer_data.get('email'),
            name=customer_data.get('name'),
            surname=customer_data.get('surname')
        )

        if not database.query(Customer).filter(
                Customer.id == customer.id).first():
            database.add(customer)
        else:
            currentCustomer: Customer = database.query(Customer).filter(
                Customer.id == customer.id)
            currentCustomer.id = customer.id
            currentCustomer.email = customer.email
            currentCustomer.name = customer.name
            currentCustomer.surname = customer.surname

    database.commit()
    return {"message": "All customers have been fetched"}


def fetchingCustomerDetail(access_token, database) -> dict:
    headers: dict[str, str] = {
        'accept': 'application/json',
        'X-Group-Authorization': TOKEN_API,
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token["access_token"],
    }

    for customerId in database.query(Customer).all():
        url: str = f'https://soul-connection.fr/api/customers/{customerId.id}'
        getCustomerDetail(url, headers, customerId, database)
        database.commit()
        getCustomerImage(access_token, customerId, headers, database)
        database.commit()
        getCustomerPaymentHistory(customerId, headers, database)
        database.commit()
        getClothesImage(customerId, database, headers)
        database.commit()

    return {"message": "All customers have been fetched"}


def getCustomerDetail(url, headers, customerId, database):
    try:
        response = requests.get(url, headers=headers)
    except BaseException:
        getCustomerDetail(url, headers, customerId, database)

    if response.status_code == 401:
        # access_token = loginToken()
        getCustomerDetail(url, headers, customerId, database)
    customer_data = {}
    try:
        customer_data = response.json()
    except BaseException:
        # access_token = loginToken()
        # getCustomerDetail(url, headers, customerId, database)
        pass
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
    customer.phone_number = customer_data.get('phone_number')
    customer.address = customer_data.get('address')
    return customer


def getCustomerImage(access_token, customerId, headers, database):
    customer = database.query(Customer).filter(
        Customer.id == customerId.id).first()
    image_url = f'https: // soul - connection.fr / api / customers / {
        customer.id} / image'
    try:
        image_response = requests.get(image_url, headers=headers)
    except BaseException:
        getCustomerImage(access_token, customerId, headers, database)

    if image_response.status_code == 401:
        access_token = loginToken()
        getCustomerImage(access_token, customerId, headers)
    image_path = f'images/customers/{customer.id}.jpg'
    with open(image_path, 'wb') as image_file:
        image_file.write(image_response.content)


def getCustomerPaymentHistory(customerId, headers, database):
    customer = database.query(Customer).filter(
        Customer.id == customerId.id).first()
    payement_history_url = f'https: // soul - connection.fr / api / customers / {
        customer.id} / payments_history'
    payement_history_response = ""
    try:
        payement_history_response = requests.get(
            payement_history_url, headers=headers)
    except BaseException:
        pass
    if payement_history_response.status_code == 401:
        # access_token = loginToken()
        getCustomerPaymentHistory(customerId, headers, database)
    payement_history_datas = {}
    try:
        payement_history_datas = payement_history_response.json()
    except BaseException:
        # access_token = loginToken()
        # getCustomerPaymentHistory(customerId, headers, database)
        pass
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
            currentPayementHistory.id = payement_history.id
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
        Customer.id == customerId.id).first()
    clothes_url = f'https: // soul - connection.fr / api / customers / {
        customer.id} / clothes'
    try:
        clothes_response = requests.get(clothes_url, headers=headers)
    except BaseException:
        getClothesImage(customerId, database, headers)

    clothes_datas = {}
    if clothes_response.status_code == 401:
        access_token = loginToken()
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
        clothe_image = f'https: // soul - connection.fr / api / clothes / {
            clothes_data.get("id")} / image'
        try:
            clothe_image_response = requests.get(clothe_image, headers=headers)
        except BaseException:
            getClothesImage(customerId, database, headers)
        if not (isinstance(clothe_image_response, requests.models.Response)):
            # TODO
            pass
        if clothe_image_response.status_code == 401:
            # access_token = loginToken()
            getClothesImage(customerId, database, headers)
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
        else:
            currentClothe = database.query(Clothes).filter(
                Clothes.id == clothe.id)
            currentClothe.customer_id = clothe.customer_id
            currentClothe.id = clothe.id
            currentClothe.type = clothe.type
    # except ConnectionError as e:
    #     print("An error from the soul-connection API has occurred:", e)


# DB_USERNAME = os.getenv("POSTGRES_USER")
# DB_PASSWORD = os.getenv("POSTGRES_PASSWORD")
# DB_HOST = os.getenv("DB_HOST")
# DB_PORT = os.getenv("DB_PORT")
# DB_NAME = os.getenv("POSTGRES_DB")

# SQLALCHEMY_DATABASE_URL = f"postgresql://{DB_USERNAME}:{
#     DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# engine = create_engine(
#     SQLALCHEMY_DATABASE_URL
# )
# SessionFactory = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# def download_image(clothe_data, headers):
#     # Create a new Session for each thread
#     session = SessionFactory()

#     try:
#         clothe_image = f'https://soul-connection.fr/api/clothes/{clothe_data.get("id")}/image'
#         clothe_image_response = requests.get(clothe_image, headers=headers)

#         if clothe_image_response.status_code == 401:
#             access_token = loginToken()
#             fetchingCustomerDetail(access_token)
#             clothe_image_response = requests.get(clothe_image, headers=headers)

#         clothe_image_path = f'images/clothes/{clothe_data.get("id")}.jpg'
#         if os.path.exists(clothe_image_path):
#             os.remove(clothe_image_path)
#         with open(clothe_image_path, 'wb') as image_file:
#             image_file.write(clothe_image_response.content)

#         clothe = Clothes(
#             customer_id=clothe_data.get('customer_id'),
#             id=clothe_data.get('id'),
#             type=clothe_data.get('type'),
#         )

#         if not session.query(Clothes).filter(Clothes.id == clothe_data.get('id')).first():
#             session.add(clothe)
#             session.commit()  # Commit the transaction

#     except SQLAlchemyError as e:
#         print("An error occurred while saving to the database:", e)
#         session.rollback()
#     finally:
#         session.close()


# def getClothesImage(customer, headers, database):
#     try:
#         clothes_url = f'https://soul-connection.fr/api/customers/{customer.id}/clothes'
#         clothes_response = requests.get(clothes_url, headers=headers)

#         if clothes_response.status_code == 401:
#             access_token = loginToken()
#             fetchingCustomerDetail(access_token)
#             clothes_response = requests.get(clothes_url, headers=headers)

#         clothes_datas = clothes_response.json()

#         # Use a ThreadPoolExecutor to handle concurrent tasks
#         num_cores = os.cpu_count()
#         os.write(1, f"Number of cores: {num_cores}\n".encode())
#         with ThreadPoolExecutor(max_workers=num_cores) as executor:
#             futures = [executor.submit(download_image, clothe_data, headers) for clothe_data in clothes_datas]
#             for future in futures:
#                 future.result()

#     except BaseException as e:
#         print("An error from the soul-connection API has occurred:", e)
