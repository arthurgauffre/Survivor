import pytest
from unittest.mock import MagicMock
from sqlalchemy.orm import Session, sessionmaker

from api.crud.user.userGet import getUser
from api.database.tableRelationships import User
from api.database.database import engine

db_mock = MagicMock()


@pytest.fixture(scope='function')
def db_session():
    connection = engine.connect()
    transaction = connection.begin()
    session = sessionmaker(bind=connection)()

    yield session

    session.close()
    transaction.rollback()
    connection.close()


# def test_get_user_by_email_found(monkeypatch):
#     email = "example@example.com"
#     user = User(
#         email=email,
#         name="John",
#         surname="Doe",
#         id=1,
#         password="password",
#         birthdate="01/01/2000",
#         gender="Male"
#     )
#     db_mock.query.return_value.filter.return_value.first.return_value = user
#     monkeypatch.setattr("api.database.database", db_mock)

#     result = getUser(db_mock, email)

#     assert result.email == email
#     assert result.name == "John"
#     assert result.surname == "Doe"
#     assert result.id == user.id
#     assert result.password == "password"
