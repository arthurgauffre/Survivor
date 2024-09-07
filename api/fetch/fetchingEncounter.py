from json import JSONDecodeError
import requests
from schemas.encounterSchemas import AllEncountersSchema, EncounterByCustomerSchema
from schemas.accessToken import AccessToken
from loginTokenRetriever import loginToken
import os
from dotenv import load_dotenv

from database.tableRelationships import Encounter

load_dotenv()


TOKEN_API: str = os.getenv("TOKEN_API")


def getAllEncounters(access_token, db) -> dict[str, str]:
    url: str = 'https://soul-connection.fr/api/encounters'

    headers: dict [str, str]= {
        'accept': 'application/json',
        'X-Group-Authorization': TOKEN_API,
        'Authorization': 'Bearer ' + access_token["access_token"],
    }

    try:
        response: requests.models.Response = requests.get(url, headers=headers)
    except BaseException:
        access_token: AccessToken = loginToken()
        getAllEncounters(access_token, db)

    if response.status_code == 401:
        access_token: AccessToken = loginToken()
        getAllEncounters(access_token, db)

    encounters: list[AllEncountersSchema] = response.json()

    for encounter in encounters:
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


def getEncounterById(access_token, db) -> dict[str, str]:

    headers: dict[str, str] = {
        'accept': 'application/json',
        'X-Group-Authorization': TOKEN_API,
        'Authorization': 'Bearer ' + access_token["access_token"],
    }

    encounters = db.query(Encounter).all()

    for encounter in encounters:
        url: str = f'https://soul-connection.fr/api/encounters/{encounter.id}'
        try:
            response: requests.models.Response = requests.get(url, headers=headers)
        except BaseException:
            pass
        if response.status_code == 401:
            access_token: AccessToken = loginToken()
            getEncounterById(access_token, db)
        encounter_data = {}
        try:
            encounter_data: EncounterByCustomerSchema = response.json()
        except BaseException:
            pass
        actualEncounter = db.query(Encounter).filter(
            Encounter.id == encounter.id).first()
        actualEncounter.comment = encounter_data.get("comment")
        actualEncounter.source = encounter_data.get("source")
        db.commit()
    return {"message": "Database seeded with encounters"}
