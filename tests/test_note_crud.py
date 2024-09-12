from unittest.mock import MagicMock, patch

from fastapi import HTTPException, Request
import pytest
from api.crud.notes.noteGet import getAllNotes
from api.crud.notes.notePost import takeNote
from api.crud.notes.noteUpdate import updateNote
from api.crud.user.userGet import User
from api.crud.customers.customerGet import Customer
from api.crud.employees.employeesGet import Employee
from api.crud.notes.noteGet import Note, EmployeeCustomer
from api.schemas.noteSchemas import (InsertNoteSchema, NoteBaseSchema,
                                     ReturnGetNoteSchema)


db_mock = MagicMock()


def test_take_note_user_exists():
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

    result = takeNote(noteObject=note_object, db=db_mock)

    assert result == {"message": "Note added successfully"}
    db_mock.add.assert_called_once()
    db_mock.commit.assert_called_once()


def test_take_note_user_not_found():
    # Define sample data
    note_object = InsertNoteSchema(
        title="Sample Note",
        content="This is a sample note",
        shared=True,
        userId=999  # Non-existent user ID
    )

    # Mock the query to return None for user
    db_mock.query.return_value.filter.return_value.first.return_value = None

    with pytest.raises(HTTPException) as exc_info:
        takeNote(noteObject=note_object, db=db_mock)

    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "User not found"


def test_get_all_notes_no_auth_header():
    # Mock the request without an authorization header
    req_mock = MagicMock(Request)
    req_mock.headers.get.return_value = None

    result = getAllNotes(req=req_mock, db=db_mock)

    assert result is None


def test_get_all_notes_valid_auth_header_user_exists_employee():
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

        result = getAllNotes(req=req_mock, db=db_mock)

        expected = [ReturnGetNoteSchema(
            title="Shared Note",
            content="Note content",
            shared=True,
            id=1
        )]

        assert [note.dict() for note in result] == [note.dict() for note in expected]


def test_get_all_notes_valid_auth_header_user_exists_customer():
    # Mock a valid request with an authorization header
    req_mock = MagicMock(Request)
    auth_header = "Bearer some_jwt_token"
    req_mock.headers.get.return_value = auth_header

    # Mock JWT decoding
    decoded_token = {"sub": "test@example.com"}
    with patch("jwt.decode", return_value=decoded_token):
        email = decoded_token["sub"]

#         # Mock database queries
        user = User(id=1, email=email)
        customer = Customer(id=1, user_id=user.id)
        notes = [Note(
            id=1, title="Shared Note", content="Note content", shared=True,
            user_id=customer.user_id
        )]
        db_mock = MagicMock()

        db_mock.query.return_value.filter.return_value.first.side_effect = [user, None, customer]
        db_mock.query.return_value.filter.return_value.all.return_value = notes

        result = getAllNotes(req=req_mock, db=db_mock)

        expected = [ReturnGetNoteSchema(
            title="Shared Note",
            content="Note content",
            shared=True,
            id=1
        )]

        assert [note.dict() for note in result] == [note.dict() for note in expected]


def test_get_all_notes_valid_auth_header_user_not_found():
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


def test_update_note_success():
    # Mock the database session
    db_mock = MagicMock()

    # Mock the existing note to be found
    note_id = 1
    note = Note(id=note_id, title="Old Title", content="Old Content", shared=False)

    # Mock the query to return the existing note
    db_mock.query.return_value.filter.return_value.first.return_value = note

    # Mock the input note data for updating
    updated_note = NoteBaseSchema(title="New Title", content="New Content", shared=True)

    # Call the function under test
    result = updateNote(noteObject=updated_note, noteId=note_id, db=db_mock)

    # Assert that the update query was called with the correct parameters
    db_mock.query.return_value.filter.return_value.update.assert_called_once_with(
        {"title": "New Title", "content": "New Content", "shared": True}
    )

    # Assert that commit was called
    db_mock.commit.assert_called_once()

    # Assert the success message is returned
    assert result == {"message": "Note updated successfully"}


# Test when the note is not found (404 error)
def test_update_note_not_found():
    # Mock the database session
    db_mock = MagicMock()

    # Mock the query to return None, indicating the note was not found
    db_mock.query.return_value.filter.return_value.first.return_value = None

    # Mock the input note data
    updated_note = NoteBaseSchema(title="New Title", content="New Content", shared=True)
    note_id = 1

    # Call the function and expect it to raise HTTPException
    with pytest.raises(HTTPException) as exc_info:
        updateNote(noteObject=updated_note, noteId=note_id, db=db_mock)

    # Assert that the correct HTTPException is raised
    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Note not found"

    # Assert that commit was not called since the note was not found
    db_mock.commit.assert_not_called()
