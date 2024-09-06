from pydantic import BaseModel


class CustomerBasicSchema(BaseModel):
    id: int
    email: str
    name: str
    surname: str
    birth_date: str
    gender: str
    description: str
    astrologicalSign: str
