from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from database import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)


class Roles(Base):
    __tablename__ = "roles"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)


class payementHistory(Base):
    __tablename__ = "payementHistory"
    id = Column(Integer, primary_key=True, index=True)


class events(Base):
    __tablename__ = "events"
    id = Column(Integer, primary_key=True, index=True)
    location_x = Column(String, index=True)


# Employee table
class Employee(Base):
    __tablename__ = "employees"
    id = Column(Integer, primary_key=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True)
    password = Column(String, index=True)
    name = Column(String, index=True)
    surname = Column(String, index=True)
    birthdate = Column(String, index=True)
    gender = Column(String, index=True)
    work = Column(String, index=True)
    profilePictureLink = Column(String, index=True)
    role = relationship("Roles", back_populates="employees")


# Customer table
class Customer(Base):
    __tablename__ = "customers"
    id = Column(Integer, primary_key=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True)
    password = Column(String, index=True)
    name = Column(String, index=True)
    surname = Column(String, index=True)
    birthdate = Column(String, index=True)
    gender = Column(String, index=True)
    description = Column(String, index=True)
    astrologicalSign = Column(String, index=True)
    clothesType = Column(String, index=True)
    payementHistory = relationship(
        "payementHistory",
        back_populates="customers")


# Relation table between users and roles
class user_roles(Base):
    __tablename__ = "user_roles"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    role_id = Column(Integer, ForeignKey("roles.id"))
    user = relationship("User", back_populates="user_roles")
    role = relationship("Roles", back_populates="user_roles")
