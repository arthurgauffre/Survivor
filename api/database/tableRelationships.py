import uuid
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from database.database import Base

# List of all tables in the database in relation with the API Soul connection


# User table
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    email = Column(String, unique=True, index=True)
    password = Column(String, index=True)
    name = Column(String, index=True)
    surname = Column(String, index=True)
    birthdate = Column(String, index=True)
    gender = Column(String, index=True)

    roles = relationship("Roles", back_populates="user_role")


# Employee table
class Employee(Base):
    __tablename__ = "employees"
    id = Column(UUID(as_uuid=True), primary_key=True,
                default=uuid.uuid4, index=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    # email = Column(String, unique=True, index=True)
    # password = Column(String, index=True)
    # name = Column(String, index=True)
    # surname = Column(String, index=True)
    # birthdate = Column(String, index=True)
    # gender = Column(String, index=True)
    work = Column(String, index=True)
    # customer_id = Column(Integer, ForeignKey("customers.id"))


# Customer table
class Customer(Base):
    __tablename__ = "customers"
    id = Column(UUID(as_uuid=True), primary_key=True,
                default=uuid.uuid4, index=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    # email = Column(String, unique=True, index=True)
    # password = Column(String, index=True)
    # name = Column(String, index=True)
    # surname = Column(String, index=True)
    # birthdate = Column(String, index=True)
    # gender = Column(String, index=True)
    description = Column(String, index=True)
    astrologicalSign = Column(String, index=True)
    phone_number = Column(String, index=True)
    address = Column(String, index=True)
    payementHistory = relationship("PayementHistory",
                                   back_populates="customer")
    clothes = relationship("Clothes", back_populates="customer")
    # employees = relationship("Employee", back_populates="customer")


# Roles table
class Roles(Base):
    __tablename__ = "roles"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    user_role = relationship("User", back_populates="roles")


# PayementHistory table
class PayementHistory(Base):
    __tablename__ = "payementHistory"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(String, index=True)
    amount = Column(Integer, index=True)
    comment = Column(String, index=True)
    payment_method = Column(String, index=True)
    customer_id = Column(UUID(as_uuid=True), ForeignKey("customers.id"))
    customer = relationship("Customer", back_populates="payementHistory")


# Event table
class Events(Base):
    __tablename__ = "events"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    date = Column(String, index=True)
    duration = Column(Integer, index=True)
    max_participants = Column(Integer, index=True)
    location_x = Column(String, index=True)
    location_y = Column(String, index=True)
    type = Column(String, index=True)
    employee_id = Column(UUID(as_uuid=True), ForeignKey("employees.id"))
    location_name = Column(String, index=True)


# Encounters table
class Encounter(Base):
    __tablename__ = "encounters"
    id = Column(Integer, primary_key=True, index=True, nullable=False)
    customer_id = Column(UUID(as_uuid=True), ForeignKey("customers.id"))
    date = Column(String, index=True)
    rating = Column(Integer, index=True)
    comment = Column(String, index=True)
    source = Column(String, index=True)


# Tips table
class Tips(Base):
    __tablename__ = "tips"
    id = Column(Integer, primary_key=True, index=True, nullable=False)
    title = Column(String, index=True)
    tip = Column(String, index=True)


# Clothes table
class Clothes(Base):
    __tablename__ = "clothes"
    id = Column(Integer, primary_key=True, index=True, nullable=False)
    type = Column(String, index=True)
    customer_id = Column(UUID(as_uuid=True), ForeignKey("customers.id"))
    customer = relationship("Customer", back_populates="clothes")


# Chat table
class Chat(Base):
    __tablename__ = "chat"
    id = Column(Integer, primary_key=True, index=True, nullable=False)
    customer_id = Column(UUID(as_uuid=True), ForeignKey("customers.id"))
    employee_id = Column(UUID(as_uuid=True), ForeignKey("employees.id"))
    message = Column(String, index=True)
    date = Column(String, index=True)
    senderId = Column(Integer, index=True)


# Employee / Customer relationship table
class EmployeeCustomer(Base):
    __tablename__ = "employeeCustomer"
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(UUID(as_uuid=True), ForeignKey("employees.id"))
    customer_id = Column(UUID(as_uuid=True), ForeignKey("customers.id"))
