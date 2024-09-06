from pydantic import BaseModel


class CustomerBasicSchema(BaseModel):
    id: int
    email: str
    name: str
    surname: str
    birthdate: str
    gender: str
    description: str
    astrologicalSign: str
    phone_number: str
    address: str
