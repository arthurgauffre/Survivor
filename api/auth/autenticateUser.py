import os
from datetime import timedelta

from auth.createToken import create_access_token
from crud.user.userGet import getUser
from dotenv import load_dotenv
from fastapi import HTTPException, status
from passwordOperations import verifyPassword
from pydantic import SecretStr
from schemas.tokenSchemas import Token
from sqlalchemy.orm import Session

load_dotenv()

ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")


def authenticateUser(db: Session, email: str, password: SecretStr):
    user = getUser(db, email)

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
