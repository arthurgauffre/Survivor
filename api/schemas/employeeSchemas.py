from pydantic import BaseModel


class EmployeeBaseSchema(BaseModel):
    id: int
    email: str
    name: str
    surname: str


class EmployeePersonalInfoSchema(EmployeeBaseSchema):
    birth_date: str
    gender: str
    work: str
