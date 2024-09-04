from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fetch.fetchingEncounter import getAllEncounters, getEncounterById
from fetch.fetchingCustomer import fetchingAllCustomer, fetchingCustomerDetail
from database.database import get_db
from fetch.fetchingEmployee import (getAllEmployees, getEmployeeById,
                                    getEmployeeImg)
from fetch.fetchingTips import fetchingAllTips
from loginTokenRetriever import loginToken

router = APIRouter()

access_token = loginToken()


@router.get("/getAPIEmployeesInfos/")
def getAPIEmployeesInfos(db: Session = Depends(get_db)):
    getAllEmployees(access_token, db)
    getEmployeeById(access_token, db)
    getEmployeeImg(access_token, db)
    return {"message": "Database seeded with employees"}


@router.get("/getAPICustomersInfos/")
def getAPICustomersInfos(db: Session = Depends(get_db)):
    fetchingAllCustomer(access_token, db)
    fetchingCustomerDetail(access_token, db)
    return {"message": "Database seeded with customers"}


@router.get("/getAPITipsInfos/")
def getTips(db: Session = Depends(get_db)):
    fetchingAllTips(access_token, db)
    return {"message": "Database seeded with tips"}


@router.get("/getAPIEncountersInfos/")
def getAPIEncountersInfos(db: Session = Depends(get_db)):
    getAllEncounters(access_token, db)
    getEncounterById(access_token, db)
    return {"message": "Database seeded with encounters"}
