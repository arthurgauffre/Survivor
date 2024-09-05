from pydantic import BaseModel


class BasicUserSchema(BaseModel):
    id: int
    email: str
    name: str
    surname: str
    birthdate: str
    gender: str
    description: str
    astrologicalSign: str
