import os
from fastapi import HTTPException
from sqlalchemy.orm import Session

from schemas.clothesSchemas import ClothesAllSchema
from database.tableRelationships import Clothes


def getAllClothesImgs(db: Session):
    allClothes = db.query(Clothes).all()
    listOfAllClothes = []
    for clothe in allClothes:
        image_path = f"/app/api/images/clothes/{clothe.id}.jpg"
        image_url = f"http://fastapi:8000/static/clothes/{clothe.id}.jpg"
        if not os.path.exists(image_path):
            raise HTTPException(status_code=404, detail="Image not found")
        listOfAllClothes.append(ClothesAllSchema(
            id=clothe.id,
            customer_id=clothe.customer_id,
            type=clothe.type,
            link=image_url
        ))
    return listOfAllClothes

