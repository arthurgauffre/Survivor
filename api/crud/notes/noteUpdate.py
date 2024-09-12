
from database.tableRelationships import Note
from schemas.noteSchemas import NoteBaseSchema
from sqlalchemy.orm import Session


def updateNote(noteObject: NoteBaseSchema, noteId: int, db: Session):
    db.query(Note).filter(Note.id == noteId).update(
        {"title": noteObject.title,
         "content": noteObject.content, "shared": noteObject.shared})
    db.commit()
    return {"message": "Note updated successfully"}
