import requests
import os
from dotenv import load_dotenv

from loginTokenRetriever import loginToken
from database.tableRelationships import Tips

load_dotenv()

TOKEN_API = os.getenv("TOKEN_API")
AUTH_EMAIL = os.getenv("AUTH_EMAIL")
AUTH_PASSWORD = os.getenv("AUTH_PASSWORD")


def fetchingAllTips(acccess_token, database):
    url = 'https://soul-connection.fr/api/tips'

    headers = {
        'accept': 'application/json',
        'X-Group-Authorization': TOKEN_API,
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + acccess_token["access_token"],
    }

    response = requests.get(url, json=None, headers=headers)

    if response.status_code == 401:
        acccess_token = loginToken()
        fetchingAllTips(acccess_token)

    # Parse JSON response and create Customer instances
    tips_data = response.json()

    for tip_data in tips_data:
        # Create a new Customer object
        tip = Tips(
            id=tip_data.get('id'),
            title=tip_data.get('title'),
            tip=tip_data.get('tip')
        )

        # Add the new customer to the customers table
        if not database.query(Tips).filter(
                Tips.id == tip.id).first():
            database.add(tip)
        else:
            database.update(Tips).where(Tips.id == tip.id).values(
                title=tip.title,
                tip=tip.tip
            )

    # Commit the session to save all changes
    database.commit()
    return response.json()
