from database.database import engine
from database.tableRelationships import Employee
from fastapi import HTTPException, status
from fetch.fetchingCustomer import fetchingAllCustomer, fetchingCustomerDetail
from fetch.fetchingEmployee import (fillingEmployeeCustomerTable,
                                    getAllEmployees, getEmployeeDetail)
from fetch.fetchingEncounter import getAllEncounters, getEncounterById
from fetch.fetchingEvents import fetchingAllEvents
from fetch.fetchingTips import fetchingAllTips
from loginTokenRetriever import loginToken
from sqlalchemy.orm import Session

access_token = loginToken()
while access_token == {}:
    access_token = loginToken()


class SeedState:
    def __init__(self):
        self._is_seeded = False

    def seed_database(self, db: Session):
        if not db.query(Employee).first():
            fetchingAllCustomer(access_token, db)
            fetchingCustomerDetail(access_token, db)
            getAllEmployees(access_token, db)
            getEmployeeDetail(access_token, db)
            fillingEmployeeCustomerTable(db)
            fetchingAllTips(access_token, db)
            getAllEncounters(access_token, db)
            getEncounterById(access_token, db)
            fetchingAllEvents(access_token, db)
            self._is_seeded = True
            with open("seeded.txt", "w") as f:
                f.write("Database seeded")
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
