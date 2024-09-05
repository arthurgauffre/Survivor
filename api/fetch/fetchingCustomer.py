import requests
import os
from dotenv import load_dotenv

from loginTokenRetriever import loginToken
from database.tableRelationships import Customer, PayementHistory, Clothes

# from concurrent.futures import ThreadPoolExecutor
# from sqlalchemy.exc import SQLAlchemyError
# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker
from requests.exceptions import ConnectionError

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
        getClothesImage(customer, headers, database)
        database.commit()
        os.write(1, f"Customer {customerId.id} has been fetched\n".encode())

    return {"message": "All customers have been fetched"}


def getCustomerDetail(url, headers, customerId, database):
    response = requests.get(url, headers=headers)
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
    try:
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
    except ConnectionError as e:
        print("An error from the soul-connection API has occurred:", e)







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
#             acccess_token = loginToken()
#             fetchingCustomerDetail(acccess_token)
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
#             acccess_token = loginToken()
#             fetchingCustomerDetail(acccess_token)
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
