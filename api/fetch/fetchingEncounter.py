import os
from concurrent.futures import ThreadPoolExecutor

import requests
from database.tableRelationships import Customer, Encounter
from dotenv import load_dotenv
from fetch.fetchingCustomer import SessionFactory
from loginTokenRetriever import loginToken

load_dotenv()


TOKEN_API = os.getenv("TOKEN_API")


def getAllEncounters(access_token, db):
    url = 'https://soul-connection.fr/api/encounters'

    headers = {
        'accept': 'application/json',
        'X-Group-Authorization': TOKEN_API,
        'Authorization': 'Bearer ' + access_token["access_token"],
    }

    try:
        response = requests.get(url, headers=headers)
    except BaseException:
        access_token = loginToken()
        getAllEncounters(access_token, db)

    if response.status_code == 401:
        access_token = loginToken()
        getAllEncounters(access_token, db)

    encountersData = response.json()

    for encounter in encountersData:
        currentCustomer = db.query(Customer).filter(
            Customer.user_id == encounter["customer_id"]).first()
        encounter = Encounter(
            id=encounter["id"],
            customer_id=currentCustomer.id,
            date=encounter["date"],
            rating=encounter["rating"])
        if not db.query(Encounter).filter(
                Encounter.id == encounter.id).first():
            db.add(encounter)
        db.commit()
    return {"message": "Database seeded with encounters"}


def getEncounterByIdThread(encounterId, access_token):
    session = SessionFactory()
    headers = {
        'accept': 'application/json',
        'X-Group-Authorization': TOKEN_API,
        'Authorization': 'Bearer ' + access_token["access_token"],
    }

    url = f'https://soul-connection.fr/api/encounters/{encounterId.id}'
    try:
        response = requests.get(url, headers=headers)
    except BaseException:
        print(f"Error fetching encounter {encounterId.id}")
        session.rollback()
        session.close()
        return

    if response.status_code == 401:
        session.close()
        access_token = loginToken()
        return getEncounterByIdThread(encounterId, access_token)

    try:
        encounter_data = response.json()
    except BaseException:
        session.rollback()
        session.close()
        access_token = loginToken()
        return getEncounterByIdThread(encounterId, access_token)

    actualEncounter = session.query(Encounter).filter(
        Encounter.id == encounterId.id).first()
    if actualEncounter:
        actualEncounter.comment = encounter_data.get("comment")
        actualEncounter.source = encounter_data.get("source")

    try:
        session.commit()
    except Exception as e:
        print(f"Error committing encounter {encounterId.id}: {e}")
        session.rollback()
    finally:
        session.close()


def getEncounterById(access_token, db):
    with ThreadPoolExecutor(max_workers=max(1, os.cpu_count() - 4)) as executor:
        futures = [
            executor.submit(getEncounterByIdThread, encounterId, access_token)
            for encounterId in db.query(Encounter).all()
        ]

        for future in futures:
            try:
                future.result()
            except Exception as e:
                print(f"Error in thread: {e}")

    return {"message": "Database seeded with encounters"}
