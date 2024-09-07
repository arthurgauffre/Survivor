from pydantic import BaseModel, SecretStr


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str | None = None


class TokenLogin(BaseModel):
    email: str
    password: SecretStr
