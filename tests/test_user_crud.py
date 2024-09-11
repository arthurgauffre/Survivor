from unittest.mock import MagicMock

from api.crud.user.userGet import User, getUser

db_mock = MagicMock()


def test_get_user_by_email_found():
    email = "example@example.com"
    user = User(
        email=email,
        name="John",
        surname="Doe",
        id=1,
        password="password",
        birthdate="01/01/2000",
        gender="Male"
    )
    db_mock.query.return_value.filter.return_value.first.return_value = user

    result = getUser(db_mock, email)

    assert result.email == email
    assert result.name == "John"
    assert result.surname == "Doe"
    assert result.id == user.id
    assert result.password == "password"


def test_get_user_by_email_not_found(monkeypatch):
    email = "toto"
    db_mock.query.return_value.filter.return_value.first.return_value = None
    result = getUser(db_mock, email)

    assert result is None
