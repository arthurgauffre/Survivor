import os
from fastapi import HTTPException, status
from pydantic import SecretStr
from sqlalchemy.orm import Session
from auth.createToken import create_access_token
from passwordOperations import verifyPassword
from crud.user.userGet import getCustomer, getEmployee
from datetime import timedelta
from schemas.tokenSchemas import Token
from dotenv import load_dotenv

load_dotenv()

ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")


def authenticateUser(db: Session, email: str, password: SecretStr):
    employee = getEmployee(db, email)
    customer = getCustomer(db, email)

    user = employee if employee is not None else customer

    if not verifyPassword(password, user.password):
        return False
    return user


def getAccessToken(db: Session, email: str, password: SecretStr):
    user = authenticateUser(db, email,
                            password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=float(
        ACCESS_TOKEN_EXPIRE_MINUTES))
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")
