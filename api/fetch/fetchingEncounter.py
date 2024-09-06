from json import JSONDecodeError
import requests
from loginTokenRetriever import loginToken
import os
from dotenv import load_dotenv

from database.tableRelationships import Encounter

load_dotenv()


TOKEN_API = os.getenv("TOKEN_API")


def getAllEncounters(access_token, db):
    url = 'https://soul-connection.fr/api/encounters'

    headers = {
        'accept': 'application/json',
        'X-Group-Authorization': TOKEN_API,
        'Authorization': 'Bearer ' + access_token["access_token"],
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 401:
        access_token = loginToken()
        getAllEncounters(access_token, db)

    for encounter in response.json():
        encounter = Encounter(
            id=encounter["id"],
            customer_id=encounter["customer_id"],
            date=encounter["date"],
            rating=encounter["rating"])
        if not db.query(Encounter).filter(
                Encounter.id == encounter.id).first():
            db.add(encounter)
        db.commit()
    return {"message": "Database seeded with encounters"}


def getEncounterById(access_token, db):

    headers = {
        'accept': 'application/json',
        'X-Group-Authorization': TOKEN_API,
        'Authorization': 'Bearer ' + access_token["access_token"],
    }

    for encounterId in db.query(Encounter).all():
        url = f'https://soul-connection.fr/api/encounters/{encounterId.id}'
        try:
            response = requests.get(url, headers=headers)
        except BaseException:
            pass
        if response.status_code == 401:
            access_token = loginToken()
            getEncounterById(access_token, db)
        encounter_data = {}
        try:
            encounter_data = response.json()
        except BaseException:
            pass
        actualEncounter = db.query(Encounter).filter(
            Encounter.id == encounterId.id).first()
        actualEncounter.comment = encounter_data.get("comment")
        actualEncounter.source = encounter_data.get("source")
        db.commit()
    return {"message": "Database seeded with encounters"}
