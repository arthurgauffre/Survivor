from sqlalchemy.orm import Session

from schemas.employeeSchemas import EmployeePersonalInfoSchema
from database.tableRelationships import Employee


def getAllRealEmployees(db: Session):
    employees = db.query(Employee).all()
    listOfAllEmployees = []

    for employee in employees:
        listOfAllEmployees.append(
            {
                "id": employee.id,
                "name": employee.name,
                "surname": employee.surname,
                "email": employee.email,
            }
        )
    return listOfAllEmployees


def getAnEmployeePersonalInfos(db: Session, employee_id: int):
    actualEmployee = db.query(Employee).filter(
        Employee.id == employee_id).first()
    employeeInfos = EmployeePersonalInfoSchema(
        id=actualEmployee.id,
        email=actualEmployee.email,
        name=actualEmployee.name,
        surname=actualEmployee.surname,
        birthdate=actualEmployee.birthdate,
        gender=actualEmployee.gender,
        work=actualEmployee.work
    )
    return employeeInfos
