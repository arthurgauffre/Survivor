from pydantic import BaseModel


class SendChatDataSchema(BaseModel):
    id: int
    customer_id: int
    employee_id: int
    message: str
    date: str
    senderId: int
