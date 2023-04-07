#!/usr/bin/python3
"""
Admin object class
"""
from app import models
from app.models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, Boolean
from sqlalchemy.orm import relationship
import bcrypt


class Admin(BaseModel, Base):
    """
    Admin Object representation
    """
    __tablename__ = 'admins'
    username = Column(String(128), nullable=False)
    password = Column(String(128), nullable=False)
    email = Column(String(128), nullable=False, unique=True)
    is_superadmin = Column(Boolean, default=False)
    role = Column(String(20), nullable=True, default="admin")


    def __init__(self, *args, **kwargs):
        """Initialize the Admin instance"""
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
