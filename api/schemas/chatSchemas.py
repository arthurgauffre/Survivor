from pydantic import BaseModel


class SendChatDataSchema(BaseModel):
    customer_id: int
    employee_id: int
    message: str
    date: str
    senderId: int


class ChatDataSchema(BaseModel):
    id: int
    idOfOtherPerson: int
    lastMessage: str
    dateOfLastMessage: str
    senderOfLastMessage: int


class ChatMessagesSchema(BaseModel):
    id: int
    contactId: int
    senderId: int
    message: str
    date: str
