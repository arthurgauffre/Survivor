import os

import requests
from database.tableRelationships import Tips
from dotenv import load_dotenv
from loginTokenRetriever import loginToken

load_dotenv()

TOKEN_API = os.getenv("TOKEN_API")
AUTH_EMAIL = os.getenv("AUTH_EMAIL")
AUTH_PASSWORD = os.getenv("AUTH_PASSWORD")


def fetchingAllTips(access_token, database):
    url = 'https://soul-connection.fr/api/tips'

    headers = {
        'accept': 'application/json',
        'X-Group-Authorization': TOKEN_API,
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token["access_token"],
    }

    try:
        response = requests.get(url, headers=headers)
    except BaseException:
        access_token = loginToken()
        fetchingAllTips(access_token, database)

    if response.status_code == 401:
        access_token = loginToken()
        fetchingAllTips(access_token, database)

    tips_data = response.json()

    for tip_data in tips_data:
        tip = Tips(
            id=tip_data.get('id'),
            title=tip_data.get('title'),
            tip=tip_data.get('tip')
        )

        if not database.query(Tips).filter(
                Tips.id == tip.id).first():
            database.add(tip)
        else:
            currentTip = database.query(Tips).filter(
                Tips.id == tip.id).first()
            currentTip.title = tip.title
            currentTip.tip = tip.tip
    database.commit()
    return response.json()
