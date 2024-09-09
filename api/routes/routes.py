from fastapi import APIRouter, Body, Depends
from fastapi.security import OAuth2PasswordBearer
from fastapi.staticfiles import StaticFiles
from pydantic import SecretStr
from sqlalchemy.orm import Session

from schemas.chatSchemas import SendChatDataSchema
from crud.chat.chatPost import sendChatData
from seedingDB import SeedState
from auth.autenticateUser import getAccessToken
from crud.tips.tipsGet import getAllTips
from schemas.tipsSchemas import AllTipsSchema
from crud.events.eventsGet import getAllEventsPerEmployee
from crud.clothes.clothesGet import (getAllBottomFromAUser,
                                     getAllClothesImgs, getAllHatFromAUser,
                                     getAllShoesFromAUser,
                                     getAllTopFromAUser)

from crud.customers.customerGet import getAllRealCustomers
from crud.customers.customerGet import getACustomer
from crud.customers.customerGet import getCurrentCustomerImg
from crud.customers.customerGet import getCustomerPaymentHistory
from crud.employees.employeesGet import (getAllRealEmployees,
                                         getAnEmployeePersonalInfos,
                                         getCurrentEmployeeImg,
                                         getListOfCustomerForEmployee)
from crud.encounters.encountersGet import getEncounterForCustomer
from schemas.tokenSchemas import Token
from schemas.eventsSchemas import EmployeeEventsSchema
from schemas.employeeSchemas import EmployeePersonalInfoSchema
from schemas.customerSchemas import CustomerBasicSchema
from schemas.encounterSchemas import EncounterByCustomerSchema
from schemas.clothesSchemas import ClothesAllSchema
from schemas.paymentsHistorySchemas import PaymentHistorySchema

from database.database import get_db


router = APIRouter()


router.mount("/static/employees", StaticFiles(
    directory="/app/api/images/employees/"), name="employees")


router.mount("/static/clothes", StaticFiles(
    directory="/app/api/images/clothes"), name="clothes")


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


# def seed_database():
#     seed_state = SeedState()
#     with next(get_db()) as db:
#         seed_state.seed_database(db)


# async def run_periodically(interval: int, func):
#     """Runs a function periodically every `interval` seconds."""
#     while True:
#         func()
#         await asyncio.sleep(interval)


# @router.on_event("startup")
# async def startup_event():
#     interval_in_minutes = 10
#     interval_in_seconds = interval_in_minutes * 60
#     # Run the seeding function immediately
#     seed_database()
#     # Schedule periodic execution
#     asyncio.create_task(run_periodically(interval_in_seconds, seed_database))

@router.on_event("startup")
def startup_event():
    seed_state = SeedState()
    with next(get_db()) as db:
        seed_state.seed_database(db)


@router.post("/login", response_model=Token)
def loginForAccessToken(
    db: Session = Depends(get_db),
    email: str = Body(...),
    password: SecretStr = Body(...),
) -> Token:
    return getAccessToken(db, email, password)


@router.get("/api/encounters/customer/{customer_id}",
            response_model=list[EncounterByCustomerSchema],
            tags=["encounters"],
            dependencies=[Depends(oauth2_scheme)])
def getEmployeesEncounter(customer_id: int, db: Session = Depends(
        get_db)) -> list[EncounterByCustomerSchema]:
    return getEncounterForCustomer(db, customer_id)


@router.get("/api/customers/", response_model=list[CustomerBasicSchema],
            tags=["customers"],
            dependencies=[Depends(oauth2_scheme)])
def getCustomers(db: Session = Depends(get_db)) -> list[
        CustomerBasicSchema]:
    return getAllRealCustomers(db)


@router.get("/api/customers/{customer_id}", response_model=CustomerBasicSchema,
            tags=["customers"],
            dependencies=[Depends(oauth2_scheme)])
def getCustomer(customer_id: int, db: Session = Depends(get_db)
                ) -> CustomerBasicSchema:
    return getACustomer(db, customer_id)


@router.get("/api/customers/{customer_id}/image", tags=["customers"])
def getCustomerImg(customer_id: int, db: Session = Depends(get_db)) -> str:
    return getCurrentCustomerImg(db, customer_id)


@router.get("/api/employees/", response_model=list[EmployeePersonalInfoSchema],
            tags=["employees"],
            dependencies=[Depends(oauth2_scheme)])
def getEmployees(db: Session = Depends(get_db)) -> list[
        EmployeePersonalInfoSchema]:
    return getAllRealEmployees(db)


@router.get("/api/customers/{customer_id}/payement_history",
            response_model=list[PaymentHistorySchema],
            tags=["customers"],
            )
def getCustomerPayment(customer_id: int,
                       db: Session = Depends(get_db)) -> list[
                           PaymentHistorySchema]:
    return getCustomerPaymentHistory(db, customer_id)


@router.get("/api/employees/{employee_id}",
            response_model=EmployeePersonalInfoSchema,
            tags=["employees"],
            dependencies=[Depends(oauth2_scheme)])
def getAnEmployeeInfos(employee_id: int, db: Session = Depends(
        get_db)) -> EmployeePersonalInfoSchema:
    return getAnEmployeePersonalInfos(db, employee_id)


@router.get("/api/employees/{employee_id}/image",
            tags=["employees"])
            # dependencies=[Depends(oauth2_scheme)])
def getTheCurrentEmployeeImg(employee_id: int, db: Session = Depends(
        get_db)):
    return getCurrentEmployeeImg(db, employee_id)


@router.get("/api/{employee_id}/customers",
            tags=["employees"],
            dependencies=[Depends(oauth2_scheme)])
def getCustomersOfAnEmployee(employee_id: int, db: Session = Depends(get_db)):
    return getListOfCustomerForEmployee(db, employee_id)


@router.get("/api/clothes",
            tags=["clothes"], response_model=list[ClothesAllSchema])
            # dependencies=[Depends(oauth2_scheme)])
def getClothes(db: Session = Depends(get_db)) -> list[ClothesAllSchema]:
    return getAllClothesImgs(db)


@router.get("/api/customers/{customer_id}/clothes/hat",
            tags=["clothes"],
            dependencies=[Depends(oauth2_scheme)])
def getGivenCustomerHat(customer_id: int, db: Session = Depends(get_db)):
    return getAllHatFromAUser(db, customer_id)


@router.get("/api/customers/{customer_id}/clothes/top",
            tags=["clothes"],
            dependencies=[Depends(oauth2_scheme)])
def getGivenCustomerTop(customer_id: int, db: Session = Depends(get_db)):
    return getAllTopFromAUser(db, customer_id)


@router.get("/api/customers/{customer_id}/clothes/bottom",
            tags=["clothes"],
            dependencies=[Depends(oauth2_scheme)])
def getGivenCustomerBottom(customer_id: int, db: Session = Depends(get_db)):
    return getAllBottomFromAUser(db, customer_id)


@router.get("/api/customers/{customer_id}/clothes/shoes",
            tags=["clothes"],
            dependencies=[Depends(oauth2_scheme)])
def getGivenCustomerShoes(customer_id: int, db: Session = Depends(get_db)):
    return getAllShoesFromAUser(db, customer_id)


@router.get("/api/events/{employee_id}",
            tags=["events"],
            response_model=list[EmployeeEventsSchema],
            dependencies=[Depends(oauth2_scheme)])
def getEmployeeEvents(employee_id: int, db: Session = Depends(get_db)):
    return getAllEventsPerEmployee(db, employee_id)


@router.get("/api/tips",
            tags=["tips"],
            response_model=list[AllTipsSchema],
            dependencies=[Depends(oauth2_scheme)])
def getTips(db: Session = Depends(get_db)) -> list[AllTipsSchema]:
    return getAllTips(db)


@router.post("/api/chat",
             tags=["chat"],
             dependencies=[Depends(oauth2_scheme)])
def chatWithEmployee(chatData: SendChatDataSchema,
                     db: Session = Depends(get_db)):
    return sendChatData(chatData, db)
