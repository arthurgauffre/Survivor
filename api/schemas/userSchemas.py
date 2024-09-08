from pydantic import BaseModel


class User(BaseModel):
    email: str | None = None
    name: str | None = None


class BasicUserSchema(BaseModel):
    id: int
    email: str
    name: str
    surname: str
    birthdate: str
    gender: str
    description: str
    astrologicalSign: str


class UserInDB(User):
    hashed_password: str
