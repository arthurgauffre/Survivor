import jwt
from database.tableRelationships import Chat, Customer, Employee, User
from fastapi import HTTPException, Request
from schemas.chatSchemas import ChatDataSchema, ChatMessagesSchema
from sqlalchemy import desc
from sqlalchemy.orm import Session


def getChatData(req: Request, db: Session):
    finalReturn = []
    newHeader = req.headers.get("authorization")
    email = None
    user = None
    customer = None
    employee = None
    if newHeader:
        newHeader = newHeader.split(" ")[1]
        decoded = jwt.decode(newHeader, options={"verify_signature": False})
        email = decoded["sub"]
    listOfId = []
    if email is not None:
        user = db.query(User).filter(
            User.email == email).first()
    if user is not None:
        employee = db.query(Employee).filter(
            Employee.user_id == user.id).first()
        customer = db.query(Customer).filter(
            Customer.user_id == user.id).first()
    if employee is not None:
        chatOfEmployee = db.query(Chat).filter(
            Chat.employee_id == employee.id).order_by(desc(Chat.date)).all()
        for chat in chatOfEmployee:
            if chat.customer_id not in listOfId:
                customer = db.query(Customer).filter(
                    Customer.id == chat.customer_id).first()
                finalReturn.append(ChatDataSchema(
                    id=customer.user_id,
                    idOfOtherPerson=customer.user_id,
                    lastMessage=chat.message,
                    dateOfLastMessage=chat.date,
                    senderOfLastMessage=chat.senderId
                ))
                listOfId.append(chat.customer_id)
        return finalReturn
    if customer is not None:
        chatOfCustomer = db.query(Chat).filter(
            Chat.customer_id == customer.id).order_by(desc(Chat.date)).all()
        for chat in chatOfCustomer:
            if chat.employee_id not in listOfId:
                employee = db.query(Employee).filter(
                    Employee.id == chat.employee_id).first()
                finalReturn.append(ChatDataSchema(
                    id=employee.user_id,
                    idOfOtherPerson=employee.user_id,
                    lastMessage=chat.message,
                    dateOfLastMessage=chat.date,
                    senderOfLastMessage=chat.senderId
                ))
                listOfId.append(chat.employee_id)

    return finalReturn


def getDataInChat(db: Session, user_id: int):
    finalReturn = []
    user = db.query(User).filter(
        User.id == user_id).first()
    if user is not None:
        employee = db.query(Employee).filter(
            Employee.user_id == user.id).first()
        customer = db.query(Customer).filter(
            Customer.user_id == user.id).first()
    if employee is not None:
        chatOfEmployee = db.query(Chat).filter(
            Chat.employee_id == employee.id).all()
        for chat in chatOfEmployee:

            finalReturn.append(ChatMessagesSchema(
                id=chat.id,
                contactId=employee.user_id,
                senderId=chat.senderId,
                message=chat.message,
                date=chat.date
            ))
        return finalReturn
    if customer is not None:
        chatOfCustomer = db.query(Chat).filter(
            Chat.customer_id == customer.id).all()
        for chat in chatOfCustomer:
            finalReturn.append(ChatMessagesSchema(
                id=chat.id,
                contactId=customer.user_id,
                senderId=chat.senderId,
                message=chat.message,
                date=chat.date
            ))
    return finalReturn
