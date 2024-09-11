import jwt
from database.tableRelationships import (Customer, Employee, EmployeeCustomer,
                                         Note, User)
from fastapi import Request
from schemas.noteSchemas import ReturnGetNoteSchema
from sqlalchemy.orm import Session


def getAllNotes(req: Request, db: Session):
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
    # email = "margaud.valette188@gmail.com"
    if email is not None:
        user = db.query(User).filter(
            User.email == email).first()
    if user is not None:
        employee = db.query(Employee).filter(
            Employee.user_id == user.id).first()
        customer = db.query(Customer).filter(
            Customer.user_id == user.id).first()
    if employee is not None:
        allRelatedCustomers = db.query(EmployeeCustomer).filter(
            EmployeeCustomer.employee_id == employee.id).all()
        for customer in allRelatedCustomers:
            actualCustomer = db.query(Customer).filter(
                Customer.id == customer.customer_id).first()
            allNotes = db.query(Note).filter(
                Note.user_id == actualCustomer.user_id).all()
            for note in allNotes:
                if note.shared is True:
                    finalReturn.append(ReturnGetNoteSchema(
                        title=note.title,
                        content=note.content,
                        shared=note.shared,
                        id=note.id
                    ))
        return finalReturn

    if customer is not None:
        allNotes = db.query(Note).filter(
            Note.user_id == customer.user_id).all()
        for note in allNotes:
            finalReturn.append(ReturnGetNoteSchema(
                title=note.title,
                content=note.content,
                shared=note.shared,
                id=note.id
            ))
        return finalReturn
