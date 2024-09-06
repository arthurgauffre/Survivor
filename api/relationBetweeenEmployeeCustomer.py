import random
from sqlalchemy.orm import Session

from database.tableRelationships import Customer, Employee, EmployeeCustomer


def relationEmployeeCustomer(db: Session, employee_id: int):
    allEmployees = db.query(Employee).all()
    listOfAllCoachId = []

    for employeeId in allEmployees:
        if employeeId.work == "coach":
            listOfAllCoachId.append(employeeId.id)
    # actualEmployee = db.query(Employee).filter(
    #     Employee.id == employee_id).first()
    allCustomers = db.query(Customer).all()
    listOfCustomers = []
    listOfAllCustomersId = []

    for customerId in allCustomers:
        listOfAllCustomersId.append(customerId.id)

    for i in range(random.randint(3, 15)):
        listOfCustomers.append(random.choice(listOfAllCustomersId))

        relation = EmployeeCustomer(
            employee_id=employee_id,
            customer_id=listOfCustomers[i]
        )
        db.add(relation)
    db.commit()
    return {"listOfCustomers": "Added to the database"}
