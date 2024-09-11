
from database.tableRelationships import Note, User
from fastapi import HTTPException
from schemas.noteSchemas import InsertNoteSchema
from sqlalchemy.orm import Session


def takeNote(noteObject: InsertNoteSchema, db: Session):
    user = db.query(User).filter(User.id == noteObject.userId).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    newNote = Note(
        title=noteObject.title,
        content=noteObject.content,
        shared=noteObject.shared,
        user_id=user.id
    )
    db.add(newNote)
    db.commit()
    return {"message": "Note added successfully"}
