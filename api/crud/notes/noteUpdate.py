
from database.tableRelationships import Note
from fastapi import HTTPException
from schemas.noteSchemas import NoteBaseSchema
from sqlalchemy.orm import Session


def updateNote(noteObject: NoteBaseSchema, noteId: int, db: Session):
    note = db.query(Note).filter(Note.id == noteId).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")

    db.query(Note).filter(Note.id == noteId).update(
        {"title": noteObject.title,
            "content": noteObject.content, "shared": noteObject.shared})
    db.commit()
    return {"message": "Note updated successfully"}
