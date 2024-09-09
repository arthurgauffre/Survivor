from sqlalchemy.orm import Session

from database.tableRelationships import Events
from datetime import datetime


def getAllEventsPerEmployee(db: Session, employee_id: int):
    events = db.query(Events).filter(Events.employee_id == employee_id).all()
    datesOfAllEvents = []
    listOfAllEvents = []

    for event in events:
        datesOfAllEvents.append(str(event.date))

    sorted_dates = sorted(datesOfAllEvents, key=lambda date: datetime.strptime(date, "%Y-%m-%d"))

    for date in sorted_dates:
        actualEvent = db.query(Events).filter(Events.date == date).first()
        listOfAllEvents.append(Events(
            id=actualEvent.id,
            name=actualEvent.name,
            date=actualEvent.date,
            duration=actualEvent.duration,
            max_participants=actualEvent.max_participants,
            location_x=actualEvent.location_x,
            location_y=actualEvent.location_y,
            type=actualEvent.type,
            employee_id=actualEvent.employee_id,
            location_name=actualEvent.location_name
        ))

    return listOfAllEvents
