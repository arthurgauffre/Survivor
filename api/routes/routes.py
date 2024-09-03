from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from fetch.fetchingCustomer import fetchingCustomersInfo

from loginTokenRetriever import loginToken

router = APIRouter()

access_token = loginToken()

@router.get("/getAPIEmployeesInfos/")
def getAPIEmployeesInfos(db: Session = Depends(get_db)):
    return {"message": "Hello There"}

@router.get("/getAPICustomersInfos/")
def getAPICustomersInfos(db: Session = Depends(get_db)):
    fetchingCustomersInfo(access_token, db)
    return {"message": "Hello There"}
