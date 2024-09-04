from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas.employeeSchemas import EmployeePersonalInfoSchema
from crud.customers.customerGet import getAllRealCustomers
from crud.employees.employeesGet import (getAllRealEmployees,
                                         getAnEmployeePersonalInfos)
from schemas.userSchemas import BasicUserSchema
from crud.encounters.encountersGet import getEncounterForCustomer
from schemas.encounterSchemas import EncounterByCustomerSchema
from fetch.fetchingEncounter import getAllEncounters, getEncounterById
from fetch.fetchingCustomer import fetchingAllCustomer, fetchingCustomerDetail
from database.database import get_db
from fetch.fetchingEmployee import (getAllEmployees, getEmployeeById,
                                    getEmployeeImg)
from fetch.fetchingTips import fetchingAllTips
from fetch.fetchingEvents import fetchingAllEvents

from loginTokenRetriever import loginToken

router = APIRouter()

access_token = loginToken()

###################### TEMP ROUTES THAT SEED THE DB ######################


@router.get("/getAPIEmployeesInfos/", tags=["seed"])
def getAPIEmployeesInfos(db: Session = Depends(get_db)):
    getAllEmployees(access_token, db)
    getEmployeeById(access_token, db)
    getEmployeeImg(access_token, db)
    return {"message": "Database seeded with employees"}


@router.get("/getAPICustomersInfos/", tags=["seed"])
def getAPICustomersInfos(db: Session = Depends(get_db)):
    fetchingAllCustomer(access_token, db)
    fetchingCustomerDetail(access_token, db)
    return {"message": "Database seeded with customers"}


@router.get("/getAPITipsInfos/", tags=["seed"])
def getTips(db: Session = Depends(get_db)):
    fetchingAllTips(access_token, db)
    return {"message": "Database seeded with tips"}


@router.get("/getAPIEncountersInfos/", tags=["seed"])
def getAPIEncountersInfos(db: Session = Depends(get_db)):
    getAllEncounters(access_token, db)
    getEncounterById(access_token, db)
    return {"message": "Database seeded with encounters"}


@router.get("/getAPIEventsInfos/", tags=["seed"])
def getEvents(db: Session = Depends(get_db)):
    fetchingAllEvents(access_token, db)
    return {"message": "Database seeded with events"}
###########################################################################


@router.get("/api/encounters/customer/{customer_id}",
            response_model=list[EncounterByCustomerSchema], tags=["encounters"]
            )
def getEmployeesEncounter(customer_id: int, db: Session = Depends(
        get_db)) -> list[EncounterByCustomerSchema]:
    return getEncounterForCustomer(db, customer_id)


@router.get("/api/employees/", response_model=list[BasicUserSchema],
            tags=["employees"])
def getEmployees(db: Session = Depends(get_db)) -> list[
        BasicUserSchema]:
    return getAllRealEmployees(db)


@router.get("/api/customers/", response_model=list[BasicUserSchema],
            tags=["customers"])
def getCustomers(db: Session = Depends(get_db)) -> list[
        BasicUserSchema]:
    return getAllRealCustomers(db)


@router.get("/api/employees/{employee_id}",
            response_model=EmployeePersonalInfoSchema, tags=["employees"])
def getAnEmployeeInfos(employee_id: int, db: Session = Depends(
        get_db)) -> EmployeePersonalInfoSchema:
    return getAnEmployeePersonalInfos(db, employee_id)
