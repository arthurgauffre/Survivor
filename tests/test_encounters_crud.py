import pytest
from unittest.mock import MagicMock
from fastapi import HTTPException
from sqlalchemy.orm import Session

from api.crud.encounters.encountersGet import getEncounterForCustomer
from api.crud.encounters.encountersGet import (
    EncounterByCustomerSchema, Customer, Encounter)


def test_get_encounter_for_customer_customer_not_found():
    # Mock the db session and queries
    db_mock = MagicMock(spec=Session)
    db_mock.query.return_value.filter.return_value.first.return_value = None

    # Test for customer not found
    with pytest.raises(HTTPException) as exc_info:
        getEncounterForCustomer(db_mock, customer_id=1)

    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Customer not found"


def test_get_encounter_for_customer_no_encounter_found():
    # Mock the db session and queries
    db_mock = MagicMock(spec=Session)

    # Mock customer found
    customer_mock = Customer(id=1, user_id=1)
    db_mock.query.return_value.filter.return_value.first.return_value = customer_mock

    # Mock no encounters for the customer
    db_mock.query.return_value.filter.return_value.all.return_value = []

    # Test for no encounters found
    with pytest.raises(HTTPException) as exc_info:
        getEncounterForCustomer(db_mock, customer_id=1)

    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "No encounter found for this customer"


def test_get_encounter_for_customer_encounters_found():
    # Mock the db session and queries
    db_mock = MagicMock(spec=Session)

    # Mock customer found
    customer_mock = Customer(id=1, user_id=1)
    db_mock.query.return_value.filter.return_value.first.return_value = customer_mock

    # Mock encounters found
    encounter_mock = Encounter(id=1, customer_id=1, date="2023-09-12", rating=5, comment="Great", source="Online")
    db_mock.query.return_value.filter.return_value.all.return_value = [encounter_mock]

    # Call the function
    result = getEncounterForCustomer(db_mock, customer_id=1)

    # Assert that the result matches the expected schema
    assert len(result) == 1
    assert isinstance(result[0], EncounterByCustomerSchema)
    assert result[0].id == 1
    assert result[0].customer_id == 1
    assert result[0].date == "2023-09-12"
    assert result[0].rating == 5
    assert result[0].comment == "Great"
    assert result[0].source == "Online"
