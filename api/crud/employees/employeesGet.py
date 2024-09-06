import os
from fastapi import HTTPException
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
                "birth_date": employee.birth_date,
                "gender": employee.gender,
                "work": employee.work
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
        birth_date=actualEmployee.birth_date,
        gender=actualEmployee.gender,
        work=actualEmployee.work
    )
    return employeeInfos


def getCurrentEmployeeImg(db: Session, employee_id: int):
    image_path = f"/app/api/images/employees/{employee_id}.jpg"

    if not os.path.exists(image_path):
        raise HTTPException(status_code=404, detail="Image not found")

    image_url = f"http://localhost:8000/static/employees/{employee_id}.jpg"
    return {"image_url": image_url}
