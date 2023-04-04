#!/usr/bin/python3
"""
User object class
"""
from app import models
from app.models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, Enum, ForeignKey, CheckConstraint
from sqlalchemy.orm import relationship
import bcrypt


class VerificationStatusEnum(Enum):
    verified = 'verified'
    pending = 'pending'
    unverified = 'unverified'


class VerifyCertificate(BaseModel, Base):
    """
    VerifyCertificate Object representation
    """
    __tablename__ = 'verify_certificate'
    certificate_status = Column(Enum("verified", "pending", "unverified", name="VerificationStatusEnum"), default=VerificationStatusEnum.unverified)
    user_id = Column(String(60), ForeignKey('users.id'))
    school_id = Column(String(60), ForeignKey('schools.id'))
    certificate_id = Column(String(60), ForeignKey('certificates.id'))


    def __init__(self, *args, **kwargs):
        """
        initializes certificate verification
        """
        super().__init__(*args, **kwargs)
