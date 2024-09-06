from json import JSONDecodeError
import requests
import os
from dotenv import load_dotenv

from loginTokenRetriever import loginToken
from database.tableRelationships import Events

load_dotenv()

TOKEN_API = os.getenv("TOKEN_API")
AUTH_EMAIL = os.getenv("AUTH_EMAIL")
AUTH_PASSWORD = os.getenv("AUTH_PASSWORD")


def fetchingAllEvents(acccess_token, database):
    url = 'https://soul-connection.fr/api/events'

    headers = {
        'accept': 'application/json',
        'X-Group-Authorization': TOKEN_API,
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + acccess_token["access_token"],
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 401:
        acccess_token = loginToken()
        fetchingAllEvents(acccess_token, database)

    try:
        events_data = response.json()
    except BaseException:
        # acccess_token = loginToken()
        # fetchingAllEvents(acccess_token, database)
        pass

    for event_data in events_data:
        # Create a new Customer object
        event_url = f'https://soul-connection.fr/api/events/{event_data.get("id")}'
        response = requests.get(event_url, headers=headers)
        if response.status_code == 401:
            access_token = loginToken()
            fetchingAllEvents(access_token, database)
        event_data = response.json()
        event = Events(
            id=event_data.get('id'),
            name=event_data.get('name'),
            date=event_data.get('date'),
            duration=event_data.get('duration'),
            max_participants=event_data.get('max_participants'),
            location_x=event_data.get('location_x'),
            location_y=event_data.get('location_y'),
            type=event_data.get('type'),
            employee_id=event_data.get('employee_id'),
            location_name=event_data.get('location_name')
        )

        # Add the new customer to the customers table
        if not database.query(Events).filter(
                Events.id == event.id).first():
            database.add(event)
        else:
            database.update(Events).where(Events.id == event.id).values(
                name=event.name,
                date=event.date,
                duration=event.duration,
                max_participants=event.max_participants,
                location_x=event.location_x,
                location_y=event.location_y,
                type=event.type,
                employee_id=event.employee_id,
                location_name=event.location_name
            )

    # Commit the session to save all changes
    database.commit()
    return {"message": "Database seeded with events"}

