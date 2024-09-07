from pydantic import BaseModel


class AllEncountersSchema(BaseModel):
    id: int
    customer_id: int
    date: str
    rating: int


class EncounterByCustomerSchema(BaseModel):
    id: int
    customer_id: int
    date: str
    rating: int
    comment: str | None
    source: str | None
