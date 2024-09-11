from pydantic import BaseModel


class NoteBaseSchema(BaseModel):
    title: str
    content: str
    shared: bool


class InsertNoteSchema(NoteBaseSchema):
    userId: int


class ReturnGetNoteSchema(NoteBaseSchema):
    id: int
