from sqlalchemy.orm import Session
from database.tableRelationships import Chat, Customer, Employee
from schemas.chatSchemas import SendChatDataSchema


def sendChatData(chatData: SendChatDataSchema, db: Session):
    customer = db.query(Customer).filter(
        Customer.user_id == chatData.customer_id).first()

    actualEmployeeId = (chatData.employee_id) + 100
    employee = db.query(Employee).filter(
        Employee.user_id == actualEmployeeId).first()

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
