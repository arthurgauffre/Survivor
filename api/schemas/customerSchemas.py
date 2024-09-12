from pydantic import BaseModel


class CustomerBasicSchema(BaseModel):
    id: int
    email: str | None
    name: str | None
    surname: str | None
    birthdate: str | None
    gender: str | None
    description: str | None
    astrologicalSign: str | None
    phone_number: str | None
    address: str | None


class CustomerWithCoachSchema(CustomerBasicSchema):
    linkedCoach: int | None
