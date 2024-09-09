from pydantic import BaseModel


class RoleValueSchema(BaseModel):
    role: str
