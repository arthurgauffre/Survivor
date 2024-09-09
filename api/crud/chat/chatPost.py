from sqlalchemy.orm import Session
from database.tableRelationships import Chat
from schemas.chatSchemas import SendChatDataSchema


def sendChatData(chatData: SendChatDataSchema, db: Session):
    newChat = Chat(
        customer_id=chatData.customer_id,
        employee_id=chatData.employee_id,
        message=chatData.message,
        date=chatData.date,
        senderId=chatData.senderId
    )
    db.add(newChat)
    db.commit()
    return newChat
