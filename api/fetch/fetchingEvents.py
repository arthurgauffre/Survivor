import os
from concurrent.futures import ThreadPoolExecutor

import requests
from database.tableRelationships import Customer, Employee, Events
from dotenv import load_dotenv
from fetch.fetchingCustomer import SessionFactory
from loginTokenRetriever import loginToken

load_dotenv()

TOKEN_API = os.getenv("TOKEN_API")
AUTH_EMAIL = os.getenv("AUTH_EMAIL")
AUTH_PASSWORD = os.getenv("AUTH_PASSWORD")


def fetchSingleEvent(event_data, access_token, db):
    session = SessionFactory()  # Create a new session for each thread

    headers = {
        'accept': 'application/json',
        'X-Group-Authorization': TOKEN_API,
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token["access_token"],
    }

    event_url = f'https://soul-connection.fr/api/events/{event_data.get("id")}'

    try:
        response = requests.get(event_url, headers=headers)
        if response.status_code == 401:
            access_token = loginToken()
            return fetchSingleEvent(event_data, access_token)

        event_details = response.json()
    except Exception as e:
        print(f"Error fetching event {event_data.get('id')}: {e}")
        session.rollback()
        return

    # If event data is successfully fetched, insert or update the event in the database
    try:
        if event_details:
            existing_event = session.query(Events).filter(
                Events.id == event_data.get('id')).first()
            if not existing_event:
                # Create new event
                actualId = (event_details.get('employee_id')) + db.query(Customer).count()
                actualEmployee = db.query(Employee).filter(
                    Employee.user_id == actualId).first(
                )
                new_event = Events(
                    id=event_data.get('id'),
                    name=event_data.get('name'),
                    date=event_data.get('date'),
                    duration=event_data.get('duration'),
                    max_participants=event_data.get('max_participants'),
                    location_x=event_details.get('location_x'),
                    location_y=event_details.get('location_y'),
                    type=event_details.get('type'),
                    employee_id=actualEmployee.id,
                    location_name=event_details.get('location_name'))
                session.add(new_event)
            else:
                # Update existing event
                existing_event.name = event_details.get('name')
                existing_event.date = event_details.get('date')
                existing_event.duration = event_details.get('duration')
                existing_event.max_participants = event_details.get('max_participants')
                existing_event.location_x = event_details.get('location_x')
                existing_event.location_y = event_details.get('location_y')
                existing_event.type = event_details.get('type')
                existing_event.employee_id = event_details.get('employee_id')
                existing_event.location_name = event_details.get('location_name')
            session.commit()
    except Exception as e:
        print(f"Error saving event {event_data.get('id')} to database: {e}")
        session.rollback()
    finally:
        session.close()


def fetchingAllEvents(access_token, database):
    url = 'https://soul-connection.fr/api/events'

    headers = {
        'accept': 'application/json',
        'X-Group-Authorization': TOKEN_API,
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token["access_token"],
    }
    response = {}
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 401:
            access_token = loginToken()
            return fetchingAllEvents(access_token, database)

        events_data = response.json()
    except Exception as e:
        print(f"Error fetching events list: {e}")
        return {"message": "Failed to fetch events"}

    # Use ThreadPoolExecutor to process events in parallel
    with ThreadPoolExecutor(max_workers=max(1, os.cpu_count() - 4)) as executor:
        futures = [
            executor.submit(fetchSingleEvent, event_data, access_token, database)
            for event_data in events_data
        ]

        # Wait for all threads to complete
        for future in futures:
            try:
                future.result()  # Will raise exceptions if any occurred during thread execution
            except Exception as e:
                print(f"Error in thread: {e}")

    return {"message": "All events fetched and stored successfully"}
