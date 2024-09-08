from database.tableRelationships import Customer, Employee
from sqlalchemy.orm import Session


def getEmployee(db: Session, email: str):
    employee = db.query(Employee).filter(Employee.email == email).first()
    if employee:
        return employee
    return None


def getCustomer(db: Session, email: str):
    customer = db.query(Customer).filter(Customer.email == email).first()
    if customer:
        return customer
    return None
