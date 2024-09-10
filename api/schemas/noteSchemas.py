from pydantic import BaseModel


class NoteBaseSchema(BaseModel):
    id: int
    title: str
    content: str
    shared: bool


class InsertNoteSchema(NoteBaseSchema):
    userId: int
