from pydantic import BaseModel


class BasicUserSchema(BaseModel):
    id: int
    email: str
    name: str
    surname: str
    birth_date: str
    gender: str
    description: str
    astrologicalSign: str
