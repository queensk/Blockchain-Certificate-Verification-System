#!/usr/bin/python3
"""
User object class
"""
from app import models
from app.models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
import bcrypt


class User(BaseModel, Base):
    """
    User Object representation
    """
    __tablename__ = 'users'
    email = Column(String(128), nullable=False, unique=True)
    password = Column(String(128), nullable=False)
    first_name = Column(String(128), nullable=True)
    last_name = Column(String(128), nullable=True)
    profile_url = Column(String(255), nullable=True)
    phone_number = Column(String(20), nullable=True)
    about_profile = Column(String(255), nullable=True)
    role = Column(String(20), nullable=True, default="user")
    certificates = relationship(
        "Certificate",
        backref='user',
        lazy='dynamic',
        cascade="all, delete, delete-orphan")
    schools = relationship(
        "School",
        backref="user",
        lazy='dynamic',
        cascade="all, delete, delete-orphan")
    certificates_verify_status = relationship(
        "VerifyCertificate",
        backref="user",
        lazy='dynamic',
        cascade="all, delete, delete-orphan")

    def __init__(self, *args, **kwargs):
        """
        initializes user
        """
        super().__init__(*args, **kwargs)

    def __setattr__(self, name, value):
        """
        sets a password with md5 encryption
        """
        if name == "password":
            value = bcrypt.hashpw(value.encode('utf-8'), bcrypt.gensalt())
        super().__setattr__(name, value)

    def check_password(self, password):
        """
        CheckPassword Encryption
        """
        hashed_password = self.password.encode('utf-8')
        password_bytes = password.encode('utf-8')
        return bcrypt.checkpw(password_bytes, hashed_password)
