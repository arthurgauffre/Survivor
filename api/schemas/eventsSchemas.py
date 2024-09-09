from pydantic import BaseModel


class EmployeeEventsSchema(BaseModel):
    id: int
    name: str
    date: str
    duration: int
    max_participants: int
    location_x: str
    location_y: str
    type: str
    employee_id: int
    location_name: str
