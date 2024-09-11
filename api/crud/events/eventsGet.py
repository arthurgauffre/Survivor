from datetime import datetime

from database.tableRelationships import Employee, Events
from fastapi import HTTPException
from schemas.eventsSchemas import EmployeeEventsSchema
from sqlalchemy.orm import Session


def getAllEventsPerEmployee(db: Session, employee_id: int):
    employee = db.query(Employee).filter(
        Employee.user_id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    events = db.query(Events).filter(
        Events.employee_id == employee.id).all()
    if not events:
        raise HTTPException(status_code=404,
                            detail="No events found for this employee")
    datesOfAllEvents = []
    listOfAllEvents = []

    for event in events:
        datesOfAllEvents.append(str(event.date))

    sorted_dates = sorted(datesOfAllEvents,
                          key=lambda date: datetime.strptime(date, "%Y-%m-%d"))

    for date in sorted_dates:
        print(date)
        actualEvent = db.query(Events).filter(Events.date == date).first()
        listOfAllEvents.append(EmployeeEventsSchema(
            id=actualEvent.id,
            name=actualEvent.name,
            date=actualEvent.date,
            duration=actualEvent.duration,
            max_participants=actualEvent.max_participants,
            location_x=actualEvent.location_x,
            location_y=actualEvent.location_y,
            type=actualEvent.type,
            employee_id=employee.user_id,
            location_name=actualEvent.location_name
        ))

    return listOfAllEvents
