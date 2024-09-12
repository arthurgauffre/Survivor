from unittest.mock import MagicMock
from fastapi import HTTPException
from sqlalchemy.orm import Session
import pytest

from api.crud.employees.employeesGet import Employee
from api.crud.events.eventsGet import Events, getAllEventsPerEmployee, getListOfAllEvents
from api.schemas.eventsSchemas import EmployeeEventsSchema


def test_get_list_of_all_events_success():
    db_mock = MagicMock()

    event1 = Events(id=1, name="Event 1", date="2024-09-11", duration=2,
                    max_participants=100,
                    location_x="50", location_y="40", type="Workshop",
                    employee_id=1, location_name="Location A")
    event2 = Events(id=2, name="Event 2", date="2024-09-12", duration=3,
                    max_participants=50, location_x="60", location_y="45",
                    type="Conference", employee_id=2,
                    location_name="Location B")

    employee1 = Employee(id=1, user_id=101)
    employee2 = Employee(id=2, user_id=102)

    db_mock.query.return_value.all.return_value = [event1, event2]

    db_mock.query.return_value.filter.return_value.first.side_effect = [employee1, employee2]

    result = getListOfAllEvents(db=db_mock)

    expected = [
        EmployeeEventsSchema(id=1, name="Event 1", date="2024-09-11",
                             duration=2, max_participants=100,
                             location_x="50", location_y="40", type="Workshop",
                             employee_id=101, location_name="Location A"),
        EmployeeEventsSchema(id=2, name="Event 2", date="2024-09-12",
                             duration=3, max_participants=50, location_x="60",
                             location_y="45", type="Conference",
                             employee_id=102, location_name="Location B")
    ]

    assert [dict(r) for r in result] == [dict(e) for e in expected]


def test_get_list_of_all_events_no_events():
    db_mock = MagicMock()

    db_mock.query.return_value.all.return_value = []

    with pytest.raises(HTTPException) as exc_info:
        getListOfAllEvents(db=db_mock)

    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "No events found"


def test_get_all_events_per_employee_employee_not_found():
    db_mock = MagicMock(spec=Session)
    db_mock.query.return_value.filter.return_value.first.return_value = None

    with pytest.raises(HTTPException) as exc_info:
        getAllEventsPerEmployee(db_mock, employee_id=1)

    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Employee not found"


def test_get_all_events_per_employee_no_events_found():
    db_mock = MagicMock(spec=Session)

    employee_mock = Employee(id=1, user_id=1)
    db_mock.query.return_value.filter.return_value.first.return_value = employee_mock

    db_mock.query.return_value.filter.return_value.all.return_value = []

    with pytest.raises(HTTPException) as exc_info:
        getAllEventsPerEmployee(db_mock, employee_id=1)

    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "No events found for this employee"
