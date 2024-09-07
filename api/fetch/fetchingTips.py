import requests
import os
from dotenv import load_dotenv

from schemas.tipsSchemas import AllTipsSchema
from schemas.accessToken import AccessToken
from loginTokenRetriever import loginToken
from database.tableRelationships import Tips

load_dotenv()

TOKEN_API: str = os.getenv("TOKEN_API")
AUTH_EMAIL: str = os.getenv("AUTH_EMAIL")
AUTH_PASSWORD: str = os.getenv("AUTH_PASSWORD")


def fetchingAllTips(access_token, database) -> dict:
    url: str = 'https://soul-connection.fr/api/tips'

    headers: dict[str, str] = {
        'accept': 'application/json',
        'X-Group-Authorization': TOKEN_API,
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token["access_token"],
    }

    try:
        response: requests.models.Request = requests.get(url, headers=headers)
    except BaseException:
        access_token: AccessToken = loginToken()
        fetchingAllTips(access_token, database)

    if response.status_code == 401:
        access_token: AccessToken = loginToken()
        fetchingAllTips(access_token, database)

    # Parse JSON response and create Customer instances
    tips_data: list[AllTipsSchema] = response.json()

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
            currentTip: Tips = database.query(Tips).filter(
                Tips.id == tip.id).first()
            currentTip.title = tip.title
            currentTip.tip = tip.tip
    database.commit()
    return response.json()
