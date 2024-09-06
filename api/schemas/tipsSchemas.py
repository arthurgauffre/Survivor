from pydantic import BaseModel


class AllTipsSchema(BaseModel):
    id: int
    title: str
    tip: str
