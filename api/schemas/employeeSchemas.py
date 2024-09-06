from pydantic import BaseModel


class EmployeeBaseSchema(BaseModel):
    id: int
    email: str
    name: str
    surname: str


class EmployeePersonalInfoSchema(EmployeeBaseSchema):
    birthdate: str
    gender: str
    work: str
    customer_list: list[int]
