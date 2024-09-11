import base64
from calendar import c
from fastapi import HTTPException
from sqlalchemy.orm import Session

from schemas.clothesSchemas import ClothesAllSchema
from database.tableRelationships import Clothes, Customer


def getAllClothesImgs(db: Session):
    allClothes = db.query(Clothes).all()
    listOfAllClothes = []
    for clothe in allClothes:
        customer = db.query(Customer).filter(
            Customer.id == clothe.customer_id).first()
        listOfAllClothes.append(ClothesAllSchema(
            id=clothe.id,
            customer_id=customer.user_id,
            type=clothe.type,
            img_content=base64.b64encode(clothe.img_content).decode("utf-8")
        ))
    return listOfAllClothes


def getAllHatFromAUser(db: Session, customer_id: int):
    customer = db.query(Customer).filter(
        Customer.user_id == customer_id).first()
    allClothes = db.query(Clothes).filter(
        Clothes.customer_id == customer.id).all()
    listOfAllClothes = []
    for clothe in allClothes:
        # customer = db.query(Customer).filter(
        #     Customer.user_id == customer_id).first()
        if clothe.type == "hat/cap":
            listOfAllClothes.append(ClothesAllSchema(
                id=clothe.id,
                customer_id=customer.user_id,
                type=clothe.type,
                img_content=base64.b64encode(clothe.img_content).decode(
                    "utf-8")
            ))
    return listOfAllClothes


def getAllTopFromAUser(db: Session, customer_id: int):
    customer = db.query(Customer).filter(
        Customer.user_id == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    allClothes = db.query(Clothes).filter(
        Clothes.customer_id == customer.id).all()
    listOfAllClothes = []
    for clothe in allClothes:
        # customer = db.query(Customer).filter(
        #     Customer.user_id == customer_id).first()
        if clothe.type == "top":
            listOfAllClothes.append(ClothesAllSchema(
                id=clothe.id,
                customer_id=customer.user_id,
                type=clothe.type,
                img_content=base64.b64encode(clothe.img_content).decode(
                    "utf-8")
            ))
    return listOfAllClothes


def getAllBottomFromAUser(db: Session, customer_id: int):
    customer = db.query(Customer).filter(
        Customer.user_id == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    allClothes = db.query(Clothes).filter(
        Clothes.customer_id == customer.id).all()
    listOfAllClothes = []
    for clothe in allClothes:
        # customer = db.query(Customer).filter(
        #     Customer.user_id == customer_id).first()
        if clothe.type == "bottom":
            listOfAllClothes.append(ClothesAllSchema(
                id=clothe.id,
                customer_id=customer.user_id,
                type=clothe.type,
                img_content=base64.b64encode(clothe.img_content).decode(
                    "utf-8")
            ))
    return listOfAllClothes


def getAllShoesFromAUser(db: Session, customer_id: int):
    customer = db.query(Customer).filter(
        Customer.user_id == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    allClothes = db.query(Clothes).filter(
        Clothes.customer_id == customer.id).all()
    listOfAllClothes = []
    for clothe in allClothes:
        # customer = db.query(Customer).filter(
        #     Customer.user_id == customer_id).first()
        if clothe.type == "shoes":
            listOfAllClothes.append(ClothesAllSchema(
                id=clothe.id,
                customer_id=customer.user_id,
                type=clothe.type,
                img_content=base64.b64encode(clothe.img_content).decode(
                    "utf-8")
            ))
    return listOfAllClothes
