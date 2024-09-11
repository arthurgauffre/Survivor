from unittest.mock import MagicMock, patch

from fastapi import HTTPException, Request
import pytest
from api.crud.notes.noteGet import getAllNotes
from api.crud.notes.notePost import takeNote
from api.crud.user.userGet import User
from api.crud.customers.customerGet import Customer
from api.crud.employees.employeesGet import Employee
from api.crud.notes.noteGet import Note, EmployeeCustomer
from api.schemas.noteSchemas import InsertNoteSchema, ReturnGetNoteSchema


db_mock = MagicMock()


def test_take_note_user_exists(monkeypatch):
    # Define sample data
    note_object = InsertNoteSchema(
        title="Sample Note",
        content="This is a sample note",
        shared=True,
        userId=1
    )

    user = User(id=1)
    db_mock.query.return_value.filter.return_value.first.return_value = user

    # Mock methods for adding and committing the note
    db_mock.add = MagicMock()
    db_mock.commit = MagicMock()

    # ("api.database.database", db_mock)

    result = takeNote(noteObject=note_object, db=db_mock)

    assert result == {"message": "Note added successfully"}
    db_mock.add.assert_called_once()
    db_mock.commit.assert_called_once()


def test_take_note_user_not_found(monkeypatch):
    # Define sample data
    note_object = InsertNoteSchema(
        title="Sample Note",
        content="This is a sample note",
        shared=True,
        userId=999  # Non-existent user ID
    )

    # Mock the query to return None for user
    db_mock.query.return_value.filter.return_value.first.return_value = None

    # ("api.database.database", db_mock)

    with pytest.raises(HTTPException) as exc_info:
        takeNote(noteObject=note_object, db=db_mock)

    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "User not found"


def test_get_all_notes_no_auth_header(monkeypatch):
    # Mock the request without an authorization header
    req_mock = MagicMock(Request)
    req_mock.headers.get.return_value = None

    #                                                                                                                                                                                                                                                                                                                                                                                                               ("api.database.database", db_mock)

    result = getAllNotes(req=req_mock, db=db_mock)

    assert result == None


def test_get_all_notes_valid_auth_header_user_exists_employee(monkeypatch):
    # Mock a valid request with an authorization header
    req_mock = MagicMock(Request)
    auth_header = "Bearer some_jwt_token"
    req_mock.headers.get.return_value = auth_header

    # Mock JWT decoding
    decoded_token = {"sub": "test@example.com"}
    with patch("jwt.decode", return_value=decoded_token):
        email = decoded_token["sub"]

        # Mock database queries
        user = User(id=1, email=email)
        employee = Employee(id=1, user_id=user.id)
        customer = Customer(id=1, user_id=user.id)
        all_related_customers = [EmployeeCustomer(employee_id=employee.id,
                                                  customer_id=customer.id)]
        notes = [Note(
            id=1, title="Shared Note", content="Note content", shared=True,
            user_id=customer.user_id
        )]

        db_mock.query.return_value.filter.return_value.first.side_effect = [user, employee, customer, customer]  # 4 calls
        db_mock.query.return_value.filter.return_value.all.side_effect = [all_related_customers, notes]

        # db_mock.query.return_value.filter.return_value.first.return_value = user
        # db_mock.query.return_value.filter.return_value.first.return_value = employee
        # db_mock.query.return_value.filter.return_value.first.return_value = customer
        # db_mock.query.return_value.filter.return_value.all.return_value = all_related_customers
        # db_mock.query.return_value.filter.return_value.first.return_value = customer
        # db_mock.query.return_value.filter.return_value.all.return_value = notes

        # db_mock.query.return_value.filter.return_value.all.side_effect = [
        #     employee, customer, all_related_customers, notes]

        #                                                                                                                                                                                                                                                                                                                                                                                                               ("api.database.database", db_mock)

        result = getAllNotes(req=req_mock, db=db_mock)

        expected = [ReturnGetNoteSchema(
            title="Shared Note",
            content="Note content",
            shared=True,
            id=1
        )]

        assert [note.dict() for note in result] == [note.dict() for note in expected]


# def test_get_all_notes_valid_auth_header_user_exists_customer(monkeypatch):
#     # Mock a valid request with an authorization header
#     req_mock = MagicMock(Request)
#     auth_header = "Bearer some_jwt_token"
#     req_mock.headers.get.return_value = auth_header

#     # Mock JWT decoding
#     decoded_token = {"sub": "test@example.com"}
#     with patch("jwt.decode", return_value=decoded_token):
#         email = decoded_token["sub"]

#         # Mock database queries
#         user = User(id=1, email=email)
#         customer = Customer(id=1, user_id=user.id)
#         notes = [Note(
#             id=1, title="Customer Note", content="Note content",
#             shared=False, user_id=customer.user_id
#         )]

#         db_mock.query.return_value.filter.return_value.first.return_value = user
#         db_mock.query.return_value.filter.return_value.all.side_effect = [
#             customer, notes]

#         #                                                                                                                                                                                                                                                                                                                                                                                                               ("api.database.database", db_mock)

#         result = getAllNotes(req=req_mock, db=db_mock)

#         expected = [ReturnGetNoteSchema(
#             title="Customer Note",
#             content="Note content",
#             shared=False,
#             id=1
#         )]

#         assert result == expected


def test_get_all_notes_valid_auth_header_user_not_found(monkeypatch):
    # Mock a valid request with an authorization header
    req_mock = MagicMock(Request)
    auth_header = "Bearer some_jwt_token"
    req_mock.headers.get.return_value = auth_header

    # Mock JWT decoding
    decoded_token = {"sub": "test@example.com"}
    with patch("jwt.decode", return_value=decoded_token):
        email = decoded_token["sub"]

        db_mock = MagicMock()

        db_mock.query.return_value.filter.return_value.first.return_value = None

        result = getAllNotes(req=req_mock, db=db_mock)

        assert result is None
