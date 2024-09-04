from pydantic import BaseModel


class EncounterByCustomerSchema(BaseModel):
    id: int
    customer_id: int
    date: str
    rating: int
    comment: str
    source: str
