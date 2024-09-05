from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fetch.fetchingEvents import fetchingAllEvents
from fetch.fetchingEncounter import getAllEncounters, getEncounterById
from fetch.fetchingTips import fetchingAllTips
from fetch.fetchingCustomer import fetchingAllCustomer, fetchingCustomerDetail
from loginTokenRetriever import loginToken
from fetch.fetchingEmployee import getAllEmployees, getEmployeeById
from database.tableRelationships import Employee
from schemas.employeeSchemas import EmployeePersonalInfoSchema
from crud.customers.customerGet import getAllRealCustomers
from crud.employees.employeesGet import (getAllRealEmployees,
                                         getAnEmployeePersonalInfos)
from schemas.userSchemas import BasicUserSchema
from crud.encounters.encountersGet import getEncounterForCustomer
from schemas.encounterSchemas import EncounterByCustomerSchema
from database.database import get_db


router = APIRouter()

access_token = loginToken()


class SeedState:
    def __init__(self):
        self._is_seeded = False

    def seed_database(self, db: Session):
        if not db.query(Employee).first():
            getAllEmployees(access_token, db)
            getEmployeeById(access_token, db)
            # getEmployeeImg(access_token, db)
            fetchingAllCustomer(access_token, db)
            fetchingCustomerDetail(access_token, db)
            fetchingAllTips(access_token, db)
            getAllEncounters(access_token, db)
            getEncounterById(access_token, db)
            fetchingAllEvents(access_token, db)
            self._is_seeded = True
            return {"message": "Database seeded successfully"}
        else:
            self._is_seeded = True

    def check_seeded(self):
        if self._is_seeded is False:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Database is not yet seeded, please try again later."
            )


def get_seed_state():
    return SeedState()


@router.on_event("startup")
def startup_event():
    seed_state = SeedState()
    with next(get_db()) as db:
        seed_state.seed_database(db)


@router.get("/api/encounters/customer/{customer_id}",
            response_model=list[EncounterByCustomerSchema],
            tags=["encounters"],
            )
def getEmployeesEncounter(customer_id: int, db: Session = Depends(
        get_db)) -> list[EncounterByCustomerSchema]:
    return getEncounterForCustomer(db, customer_id)


@router.get("/api/employees/", response_model=list[BasicUserSchema],
            tags=["employees"],
            )
def getEmployees(db: Session = Depends(get_db)) -> list[
        BasicUserSchema]:
    return getAllRealEmployees(db)


@router.get("/api/customers/", response_model=list[BasicUserSchema],
            tags=["customers"],
            )
def getCustomers(db: Session = Depends(get_db)) -> list[
        BasicUserSchema]:
    return getAllRealCustomers(db)


@router.get("/api/employees/{employee_id}",
            response_model=EmployeePersonalInfoSchema,
            tags=["employees"],
            )
def getAnEmployeeInfos(employee_id: int, db: Session = Depends(
        get_db)) -> EmployeePersonalInfoSchema:
    return getAnEmployeePersonalInfos(db, employee_id)
