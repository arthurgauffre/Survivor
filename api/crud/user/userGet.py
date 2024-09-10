from database.tableRelationships import Customer, Employee, User
from sqlalchemy.orm import Session


# def getEmployee(db: Session, email: str):
#     employee = db.query(Employee).filter(Employee.email == email).first()
#     if employee:
#         return employee
#     return None


# def getCustomer(db: Session, email: str):
#     customer = db.query(Customer).filter(Customer.email == email).first()
#     if customer:
#         return customer
#     return None


def getUser(db: Session, email: str):
    user = db.query(User).filter(
        User.email == email).first()
    if user:
        return user
    return None
