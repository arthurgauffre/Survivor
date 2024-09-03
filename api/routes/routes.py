from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db


router = APIRouter()


@router.get("/getAPIEmployeesInfos/")
def getAPIEmployeesInfos(db: Session = Depends(get_db)):
    return {"message": "Hello There"}
