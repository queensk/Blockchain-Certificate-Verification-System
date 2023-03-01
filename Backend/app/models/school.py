#!/usr/bin/python3
"""
School object model
"""

from app import models
from app.models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from hashlib import md5


class School(BaseModel, Base):
    """
    School Object representation
    """
    __tablename__ = 'schools'
    email = Column(String(128), nullable=False)
    password = Column(String(128), nullable=False)
    school_name = Column(String(128), nullable=True)
    school_location = Column(String(128), nullable=True)
    user_id = Column(String(60), ForeignKey('users.id'))
    school_certificats = relationship(
        "Certificate",
        backref='School',
        lazy='dynamic',
        cascade="all, delete, delete-orphan")

    def __init__(self, *args, **kwargs):
        """
        initializes School
        """
        super().__init__(*args, **kwargs)

    def __setattr__(self, name, value):
        """
        sets a password with md5 encryption
        """
        if name == "password":
            value = md5(value.encode()).hexdigest()
        super().__setattr__(name, value)
