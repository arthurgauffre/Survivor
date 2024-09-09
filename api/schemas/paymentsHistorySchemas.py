from pydantic import BaseModel

class PaymentHistorySchema(BaseModel):
    id: int
    date: str
    amount: int
    comment: str
    payment_method: str
    customer_id: int