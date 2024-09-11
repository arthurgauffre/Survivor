import asyncio
from fastapi import APIRouter, Body, Depends, Request
from fastapi.security import OAuth2PasswordBearer
from fastapi.staticfiles import StaticFiles
import jwt
from pydantic import SecretStr
from sqlalchemy.orm import Session

from crud.notes.noteGet import getAllNotes
from crud.notes.notePost import takeNote
from schemas.noteSchemas import InsertNoteSchema, ReturnGetNoteSchema
from crud.chat.chatGet import getChatData, getDataInChat
from database.tableRelationships import Employee, User, Customer
from schemas.chatSchemas import (ChatDataSchema, ChatMessagesSchema,
                                 SendChatDataSchema)
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
                                         getCurrentEmployeeImg)
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
            )
def getEmployeesEncounter(customer_id: int, db: Session = Depends(
        get_db)) -> list[EncounterByCustomerSchema]:
    return getEncounterForCustomer(db, customer_id)


@router.get("/api/customers/", response_model=list[CustomerBasicSchema],
            tags=["customers"],
            )
def getCustomers(db: Session = Depends(get_db)) -> list[
        CustomerBasicSchema]:
    return getAllRealCustomers(db)


@router.get("/api/customers/{customer_id}", response_model=CustomerBasicSchema,
            tags=["customers"],
            )
def getCustomer(customer_id: int, db: Session = Depends(get_db)
                ) -> CustomerBasicSchema:
    return getACustomer(db, customer_id)


@router.get("/api/customers/{customer_id}/image",
            tags=["customers"],
            )
def getCustomerImg(customer_id: int, db: Session = Depends(get_db)) -> str | None:
    return getCurrentCustomerImg(db, customer_id)


@router.get("/api/employees/", response_model=list[EmployeePersonalInfoSchema],
            tags=["employees"],
            )
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
            )
def getAnEmployeeInfos(employee_id: int, db: Session = Depends(
        get_db)) -> EmployeePersonalInfoSchema:
    return getAnEmployeePersonalInfos(db, employee_id)


@router.get("/api/employees/{employee_id}/image",
            tags=["employees"],
            )
def getTheCurrentEmployeeImg(employee_id: int, db: Session = Depends(
        get_db)) -> str | None:
    return getCurrentEmployeeImg(db, employee_id)


@router.get("/api/clothes",
            tags=["clothes"], response_model=list[ClothesAllSchema],
            )
def getClothes(db: Session = Depends(get_db)) -> list[ClothesAllSchema]:
    return getAllClothesImgs(db)


@router.get("/api/customers/{customer_id}/clothes/hat",
            tags=["clothes"],
            )
def getGivenCustomerHat(customer_id: int, db: Session = Depends(get_db)):
    return getAllHatFromAUser(db, customer_id)


@router.get("/api/customers/{customer_id}/clothes/top",
            tags=["clothes"],
            )
def getGivenCustomerTop(customer_id: int, db: Session = Depends(get_db)):
    return getAllTopFromAUser(db, customer_id)


@router.get("/api/customers/{customer_id}/clothes/bottom",
            tags=["clothes"],
            )
def getGivenCustomerBottom(customer_id: int, db: Session = Depends(get_db)):
    return getAllBottomFromAUser(db, customer_id)


@router.get("/api/customers/{customer_id}/clothes/shoes",
            tags=["clothes"],
            )
def getGivenCustomerShoes(customer_id: int, db: Session = Depends(get_db)):
    return getAllShoesFromAUser(db, customer_id)


@router.get("/api/events/{employee_id}",
            tags=["events"],
            response_model=list[EmployeeEventsSchema],
            )
def getEmployeeEvents(employee_id: int, db: Session = Depends(get_db)):
    return getAllEventsPerEmployee(db, employee_id)


@router.get("/api/tips",
            tags=["tips"],
            response_model=list[AllTipsSchema],
            )
def getTips(db: Session = Depends(get_db)) -> list[AllTipsSchema]:
    return getAllTips(db)


@router.post("/api/chat",
             tags=["chat"],
             )
def chatWithEmployee(chatData: SendChatDataSchema,
                     db: Session = Depends(get_db)):
    return sendChatData(chatData, db)


@router.get("/api/chat/{user_id}",
            tags=["chat"],
            response_model=list[ChatMessagesSchema],
            )
def getAllChatData(user_id: int,
                   db: Session = Depends(get_db)
                   ) -> list[ChatMessagesSchema]:
    return getDataInChat(db, user_id)


@router.get("/api/chat/",
            tags=["chat"],
            response_model=list[ChatDataSchema],
            )
def getChatWithEmployee(req: Request,
                        db: Session = Depends(get_db)) -> list[ChatDataSchema]:
    return getChatData(req, db)


@router.post("/api/note/",
             tags=["note"],
             )
def postNoteInfos(noteObject: InsertNoteSchema,
                  db: Session = Depends(get_db)):
    return takeNote(noteObject, db)


@router.get("/api/note/",
            tags=["note"],
            response_model=list[ReturnGetNoteSchema])
def getNoteInfos(req: Request,
                 db: Session = Depends(get_db)) -> list[ReturnGetNoteSchema]:
    return getAllNotes(req, db)


@router.get("/api/role",
            tags=["role"],
            )
def getRole(req: Request, db: Session = Depends(get_db)):
    newHeader = req.headers.get("authorization")
    email = None
    user = None
    customer = None
    employee = None
    if newHeader:
        newHeader = newHeader.split(" ")[1]
        decoded = jwt.decode(newHeader, options={"verify_signature": False})
        email = decoded["sub"]
    if email is not None:
        user = db.query(User).filter(
            User.email == email).first()
    if user is not None:
        employee = db.query(Employee).filter(
            Employee.user_id == user.id).first()
        customer = db.query(Customer).filter(
            Customer.user_id == user.id).first()

    if customer is not None:
        return {"role": "customer", "id": customer.user_id}
    elif employee is not None:
        if employee.work == "Coach":
            return {"role": employee.work, "id": employee.user_id}
        else:
            return {"role": "Admin", "id": employee.user_id}
