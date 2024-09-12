from datetime import datetime

from database.tableRelationships import Employee, Events
from fastapi import HTTPException
from schemas.eventsSchemas import EmployeeEventsSchema
from sqlalchemy.orm import Session


def getListOfAllEvents(db: Session):
    events = db.query(Events).all()
    if not events:
        raise HTTPException(status_code=404, detail="No events found")
    listOfAllEvents = []

    for event in events:
        employee = db.query(Employee).filter(
            Employee.id == event.employee_id).first()
        listOfAllEvents.append(EmployeeEventsSchema(
            id=event.id,
            name=event.name,
            date=event.date,
            duration=event.duration,
            max_participants=event.max_participants,
            location_x=event.location_x,
            location_y=event.location_y,
            type=event.type,
            employee_id=employee.user_id,
            location_name=event.location_name
        ))

    return listOfAllEvents


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
