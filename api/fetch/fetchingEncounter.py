import requests
from loginTokenRetriever import loginToken
import os
from dotenv import load_dotenv
from database.tableRelationships import Encounter
from concurrent.futures import ThreadPoolExecutor
from fetch.fetchingCustomer import SessionFactory

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


def getEncounterByIdThread(encounterId, access_token):
    session = SessionFactory()  # Create a new session for the thread
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
        session.close()  # Close the session if you re-fetch the access token
        access_token = loginToken()  # Refresh token
        return getEncounterByIdThread(encounterId, access_token)

    try:
        encounter_data = response.json()
    except BaseException:
        print(f"Error decoding JSON for encounter {encounterId.id}")
        session.rollback()
        session.close()
        return

    # Fetch the encounter from the database and update it
    actualEncounter = session.query(Encounter).filter(Encounter.id == encounterId.id).first()
    if actualEncounter:
        actualEncounter.comment = encounter_data.get("comment")
        actualEncounter.source = encounter_data.get("source")
    
    try:
        session.commit()
    except Exception as e:
        print(f"Error committing encounter {encounterId.id}: {e}")
        session.rollback()
    finally:
        session.close()  # Close the session when done

def getEncounterById(access_token, db):
    with ThreadPoolExecutor(max_workers=4) as executor:
        # Submit tasks to the thread pool
        futures = [
            executor.submit(getEncounterByIdThread, encounterId, access_token)
            for encounterId in db.query(Encounter).all()
        ]
        
        # Wait for all tasks to complete
        for future in futures:
            try:
                future.result()  # This will raise exceptions if any occurred during thread execution
            except Exception as e:
                print(f"Error in thread: {e}")

    return {"message": "Database seeded with encounters"}
