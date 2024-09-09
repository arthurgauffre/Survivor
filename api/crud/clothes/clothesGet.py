import os
from fastapi import HTTPException
from sqlalchemy.orm import Session

from schemas.clothesSchemas import ClothesAllSchema
from database.tableRelationships import Clothes


def getAllClothesImgs(db: Session):
    allClothes = db.query(Clothes).all()
    listOfAllClothes = []
    for clothe in allClothes:
        listOfAllClothes.append(ClothesAllSchema(
            id=clothe.id,
            customer_id=clothe.customer_id,
            type=clothe.type,
            img_content=clothe.img_content
        ))
    return listOfAllClothes


def getAllHatFromAUser(db: Session, customer_id: int):
    allClothes = db.query(Clothes).filter(
        Clothes.customer_id == customer_id).all()
    listOfAllClothes = []
    for clothe in allClothes:
        if clothe.type == "hat/cap":
            listOfAllClothes.append(ClothesAllSchema(
                id=clothe.id,
                customer_id=clothe.customer_id,
                type=clothe.type,
                img_content=clothe.img_content
            ))
    return listOfAllClothes


def getAllTopFromAUser(db: Session, customer_id: int):
    allClothes = db.query(Clothes).filter(
        Clothes.customer_id == customer_id).all()
    listOfAllClothes = []
    for clothe in allClothes:
        if clothe.type == "top":
            listOfAllClothes.append(ClothesAllSchema(
                id=clothe.id,
                customer_id=clothe.customer_id,
                type=clothe.type,
                img_content=clothe.img_content
            ))
    return listOfAllClothes


def getAllBottomFromAUser(db: Session, customer_id: int):
    allClothes = db.query(Clothes).filter(
        Clothes.customer_id == customer_id).all()
    listOfAllClothes = []
    for clothe in allClothes:
        if clothe.type == "bottom":
            listOfAllClothes.append(ClothesAllSchema(
                id=clothe.id,
                customer_id=clothe.customer_id,
                type=clothe.type,
                img_content=clothe.img_content
            ))
    return listOfAllClothes


def getAllShoesFromAUser(db: Session, customer_id: int):
    allClothes = db.query(Clothes).filter(
        Clothes.customer_id == customer_id).all()
    listOfAllClothes = []
    for clothe in allClothes:
        if clothe.type == "shoes":
            listOfAllClothes.append(ClothesAllSchema(
                id=clothe.id,
                customer_id=clothe.customer_id,
                type=clothe.type,
                img_content=clothe.img_content
            ))
    return listOfAllClothes
