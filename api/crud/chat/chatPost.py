from fastapi import HTTPException
from sqlalchemy.orm import Session
from database.tableRelationships import Chat, Customer, Employee
from schemas.chatSchemas import SendChatDataSchema


def sendChatData(chatData: SendChatDataSchema, db: Session):
    customer = db.query(Customer).filter(
        Customer.user_id == chatData.customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Employee not found")

    employee = db.query(Employee).filter(
        Employee.user_id == chatData.employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    newChat = Chat(
        customer_id=customer.id,
        employee_id=employee.id,
        message=chatData.message,
        date=chatData.date,
        senderId=chatData.senderId
    )
    db.add(newChat)
    db.commit()
    return {"message": "Chat sent successfully"}
