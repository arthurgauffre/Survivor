from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from api.database.database import get_db
from fetch.fetchingEmployee import getAllEmployees
from fetch.fetchingCustomer import fetchingCustomersInfo

from loginTokenRetriever import loginToken

router = APIRouter()

access_token = loginToken()


@router.get("/getAPIEmployeesInfos/")
def getAPIEmployeesInfos(db: Session = Depends(get_db)):
    getAllEmployees(access_token, db)
    return {"message": "Database seeded with employees"}


@router.get("/getAPICustomersInfos/")
def getAPICustomersInfos(db: Session = Depends(get_db)):
    fetchingCustomersInfo(access_token, db)
    return {"message": "Database seeded with customers"}
