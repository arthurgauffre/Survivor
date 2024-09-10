from pydantic import BaseModel


class EmployeeEventsSchema(BaseModel):
    id: int
    name: str
    date: str
    duration: int
    max_participants: int
    location_x: str | None
    location_y: str | None
    type: str | None
    employee_id: int
    location_name: str | None
