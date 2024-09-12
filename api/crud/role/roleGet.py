import jwt
from database.tableRelationships import Customer, Employee, User
from fastapi import Request
from sqlalchemy.orm import Session


def getTheCurrentUserRole(req: Request, db: Session):
    newHeader = req.headers.get("authorization")
    email = None
    user = None
    customer = None
    employee = None
    if newHeader:
        newHeader = newHeader.split(" ")[1]
        decoded = jwt.decode(newHeader, options={"verify_signature": False})
        email = decoded["sub"]
    if email is not None:
        user = db.query(User).filter(
            User.email == email).first()
    if user is not None:
        employee = db.query(Employee).filter(
            Employee.user_id == user.id).first()
        customer = db.query(Customer).filter(
            Customer.user_id == user.id).first()

    if customer is not None:
        return {"role": "customer", "id": customer.user_id}
    elif employee is not None:
        if employee.work == "Coach":
            return {"role": employee.work, "id": employee.user_id}
        else:
            return {"role": "Admin", "id": employee.user_id}
