import asyncio

from auth.autenticateUser import getAccessToken
from crud.chat.chatGet import getChatData, getDataInChat
from crud.chat.chatPost import sendChatData
from crud.clothes.clothesGet import (getAllBottomFromAUser, getAllClothesImgs,
                                     getAllHatFromAUser, getAllShoesFromAUser,
                                     getAllTopFromAUser)
from crud.customers.customerGet import (getACustomer, getAllRealCustomers,
                                        getCurrentCustomerImg,
                                        getCustomerPaymentHistory)
from crud.employees.employeesGet import (getAllRealEmployees,
                                         getAnEmployeePersonalInfos,
                                         getCurrentEmployeeImg)
from crud.encounters.encountersGet import getEncounterForCustomer
from crud.events.eventsGet import getAllEventsPerEmployee, getListOfAllEvents
from crud.notes.noteGet import getAllNotes
from crud.notes.notePost import takeNote
from crud.role.roleGet import getTheCurrentUserRole
from crud.tips.tipsGet import getAllTips
from database.database import get_db
from fastapi import APIRouter, Body, Depends, Request
from fastapi.security import OAuth2PasswordBearer
from fastapi.staticfiles import StaticFiles
from pydantic import SecretStr
from schemas.chatSchemas import (ChatDataSchema, ChatMessagesSchema,
                                 SendChatDataSchema)
from schemas.clothesSchemas import ClothesAllSchema
from schemas.customerSchemas import (CustomerBasicSchema,
                                     CustomerWithCoachSchema)
from schemas.employeeSchemas import EmployeePersonalInfoSchema
from schemas.encounterSchemas import EncounterByCustomerSchema
from schemas.eventsSchemas import EmployeeEventsSchema
from schemas.noteSchemas import InsertNoteSchema
from schemas.paymentsHistorySchemas import PaymentHistorySchema
from schemas.tipsSchemas import AllTipsSchema
from schemas.tokenSchemas import Token
from seedingDB import SeedState
from sqlalchemy.orm import Session

router = APIRouter()


router.mount("/static/employees", StaticFiles(
    directory="/app/api/images/employees/"), name="employees")


router.mount("/static/clothes", StaticFiles(
    directory="/app/api/images/clothes"), name="clothes")


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def seed_database():
    seed_state = SeedState()
    with next(get_db()) as db:
        seed_state.seed_database(db)


async def run_periodically(interval: int, func):
    """Runs a function periodically every `interval` seconds."""
    while True:
        func()
        await asyncio.sleep(interval)


@router.on_event("startup")
async def startup_event():
    print("Starting up...")
    interval_in_minutes = 30
    interval_in_seconds = interval_in_minutes * 60
    # Run the seeding function immediately
    seed_database()
    # Schedule periodic execution
    asyncio.create_task(run_periodically(interval_in_seconds, seed_database))

# @router.on_event("startup")
# def startup_event():
#     seed_state = SeedState()
#     with next(get_db()) as db:
#         seed_state.seed_database(db)


@router.post("/login",
             tags=["auth"],
             response_model=Token)
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


@router.get("/api/customers/{customer_id}",
            response_model=CustomerWithCoachSchema,
            tags=["customers"],
            dependencies=[Depends(oauth2_scheme)])
def getCustomer(customer_id: int, db: Session = Depends(get_db)
                ) -> CustomerWithCoachSchema:
    return getACustomer(db, customer_id)


@router.get("/api/customers/{customer_id}/image",
            tags=["customers"],
            dependencies=[Depends(oauth2_scheme)])
def getCustomerImg(customer_id: int,
                   db: Session = Depends(get_db)) -> str | None:
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
            dependencies=[Depends(oauth2_scheme)])
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
            tags=["employees"],
            dependencies=[Depends(oauth2_scheme)])
def getTheCurrentEmployeeImg(employee_id: int, db: Session = Depends(
        get_db)) -> str | None:
    return getCurrentEmployeeImg(db, employee_id)


@router.get("/api/clothes",
            tags=["clothes"], response_model=list[ClothesAllSchema],
            dependencies=[Depends(oauth2_scheme)])
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


@router.get("/api/events/",
            tags=["events"],
            response_model=list[EmployeeEventsSchema],
            dependencies=[Depends(oauth2_scheme)])
def getAllEvents(db: Session = Depends(get_db)):
    return getListOfAllEvents(db)


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


@router.get("/api/chat/{user_id}",
            tags=["chat"],
            response_model=list[ChatMessagesSchema],
            dependencies=[Depends(oauth2_scheme)])
def getAllChatData(user_id: int,
                   db: Session = Depends(get_db)
                   ) -> list[ChatMessagesSchema]:
    return getDataInChat(db, user_id)


@router.get("/api/chat/",
            tags=["chat"],
            response_model=list[ChatDataSchema],
            dependencies=[Depends(oauth2_scheme)])
def getChatWithEmployee(req: Request,
                        db: Session = Depends(get_db)) -> list[ChatDataSchema]:
    return getChatData(req, db)


@router.post("/api/note/",
             tags=["note"],
             dependencies=[Depends(oauth2_scheme)])
def postNoteInfos(noteObject: InsertNoteSchema,
                  db: Session = Depends(get_db)):
    return takeNote(noteObject, db)


@router.get("/api/note/",
            tags=["note"],
            dependencies=[Depends(oauth2_scheme)])
def getNoteInfos(req: Request,
                 db: Session = Depends(get_db)):
    return getAllNotes(req, db)


@router.get("/api/role",
            tags=["role"],
            dependencies=[Depends(oauth2_scheme)])
def getRole(req: Request, db: Session = Depends(get_db)):
    return getTheCurrentUserRole(req, db)
