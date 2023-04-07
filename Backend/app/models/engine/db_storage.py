#!/usr/bin/bash
"""
Db Storage module
"""

from app import models
from app.models.base_model import BaseModel, Base
from app.models.user import User
from app.models.school import School
from app.models.certificate import Certificate
from app.models.certificate_request_verification import VerifyCertificate
from app.models.admin import Admin
from os import getenv
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
import datetime

classes = {"User": User, "School": School, "Certificate": Certificate, "VerifyCertificate":VerifyCertificate, "Admin":Admin}


class DBstorage:
    """
    Connection class to mysql db
    """
    __engine = None
    __session = None

    def __init__(self):
        """
        Storage instance
        """
        BCV_MYSQL_USER = getenv('BCV_MYSQL_USER')
        BCV_MYSQL_PWD = getenv('BCV_MYSQL_PWD')
        BCV_MYSQL_HOST = getenv('BCV_MYSQL_HOST')
        BCV_MYSQL_DB = getenv('BCV_MYSQL_DB')
        BCV_ENV = getenv('BCV_ENV')
        self.__engine = create_engine('mysql+mysqldb://{}:{}@{}/{}'.
                                      format(BCV_MYSQL_USER,
                                             BCV_MYSQL_PWD,
                                             BCV_MYSQL_HOST,
                                             BCV_MYSQL_DB))

        if BCV_ENV == "test":
            Base.metadata.drop_all(self.__engine)

    def all(self, cls=None):
        """
        Get all the db sessions
        """
        new_dict = {}
        for clss in classes:
            if cls is None or cls is classes[clss] or cls is clss:
                objs = self.__session.query(classes[clss]).all()
                for obj in objs:
                    key = obj.__class__.__name__ + '.' + obj.id
                    new_dict[key] = obj
        return (new_dict)

    def new(self, obj):
        """
        Add the object to the current database session
        """
        self.__session.add(obj)

    def add(self, obj):
        """
        Add object to current database
        """
        self.__session.add(obj)

    def save(self):
        """
        Save object to db
        """
        self.__session.commit()

    def delete(self, obj=None):
        """
        Delete Object from db
        """
        if obj is not None:
            self.__session.delete(obj)

    def reload(self):
        """
        Reload data from the database
        """
        Base.metadata.create_all(self.__engine)
        sess_factory = sessionmaker(
            bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(sess_factory)
        self.__session = Session

    def close(self):
        """
        Removes session
        """
        self.__session.remove()

    def get(self, cls, id):
        """
        Return objects based on classname and Id
        """
        if cls not in classes.values():
            return None

        all_cls = models.storage.all(cls)
        for value in all_cls.values():
            if (value.id == id):
                return value

        return None

    def get_email(self, cls, email):
        """
        Return an object based on classname and email
        """
        if cls not in classes.values():
            return None

        all_cls = models.storage.all(cls)
        for value in all_cls.values():
            if isinstance(value, User) and value.email == email:
                return value
            if isinstance(value, School) and value.email == email:
                return value
            if isinstance(value, Admin) and value.email == email:
                return value
        return None

    def get_user_certificates(self, cls, user_id):
        """
        Return a list of objects based on classname and user_id
        """
        if cls not in classes.values():
            return None
            
        all_cls = models.storage.all(cls)
        certificates = []
        for value in all_cls.values():
            if isinstance(value, Certificate) and (value.user_id == user_id or value.school_id == user_id):
                certificates.append(value)
        return certificates



    def get_certificates_status(self, cls, certificate_id):
        """
        Return an object based on classname and certificate id
        """
        if cls not in classes.values():
            return None
        
        all_cls = models.storage.all(cls)
        for value in all_cls.values():
            if isinstance(value, VerifyCertificate) and value.certificate_id == certificate_id:
                return value

    def get_user_schools(self, cls, user_id):
        """
        Return an object based on classname and certificate id
        """
        if cls not in classes.values():
            return None
        
        all_cls = models.storage.all(cls)
        user_schools = []
        for value in all_cls.values():
            if isinstance(value, School) and value.user_id == user_id:
                user_schools.append(value)
        return user_schools

    def count(self, cls=None):
        """
        Count objects
        """
        all_class = classes.values()

        if not cls:
            count = 0
            for clas in all_class:
                count += len(models.storage.all(clas).values())
        else:
            count = len(models.storage.all(cls).values())

        return count

    def increase(self, cls=None):
        """
        Calculate percentage increase of object value
        """
        all_class = classes.values()
        today = datetime.datetime.utcnow()
        week_ago = today - datetime.timedelta(days=7)
        increase = 0

        if not cls:
            for clas in all_class:
                all_cls = models.storage.all(clas)
                for value in all_cls.values():
                    if isinstance(value, User) and value.created_at >= week_ago:
                        increase += 1
                    if isinstance(value, School) and value.created_at >= week_ago:
                        increase += 1
                    if isinstance(value, Certificate) and value.created_at >= week_ago:
                        increase += 1
                    return increase
        else:
            all_cls = models.storage.all(cls)
            for value in all_cls.values():
                if isinstance(value, User) and value.created_at >= week_ago:
                    increase += 1
                if isinstance(value, School) and value.created_at >= week_ago:
                    increase += 1
                if isinstance(value, Certificate) and value.created_at >= week_ago:
                    increase += 1
                return increase
            
    def verified_certificate_count(self):
        cls = models.storage.all(Certificate)
        count = 0
        for value in cls.values():
            if isinstance(value, Certificate) and value.verified_certificate == True:
                count +=1
        return count
