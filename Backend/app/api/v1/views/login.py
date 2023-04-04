#!/usr/bin/python3
"""
User login module
"""
from flask import jsonify, request
from app.models.user import User
from app.models.school import School
from app.models import storage
from app.api.v1.views import app_views
from datetime import datetime, timedelta
import jwt
import os


@app_views.route('/login', methods=['POST'])
def login():
    # Get the provided username and password from the request
    data = request.get_json()
    # Check if the password field is empty
    if 'password' not in data or not data['password']:
        return jsonify({'message': 'Password field is required'}), 400

    # Check if the userMail field is empty
    if 'userMail' not in data or not data['userMail']:
        return jsonify({'message': 'Email field is required'}), 400

    # Retrieve the username and password from the request data
    user_mail = data.get('userMail')
    password = data.get('password')
    user = storage.get_email(User, user_mail)
    school = storage.get_email(School, user_mail)
    if not user and not school:
        return jsonify({'message': 'Invalid password and name'}), 401

    if user:
        if user.check_password(password):
            # If the password is valid, generate an authentication token
            try:
                exp_timestamp = datetime.timestamp(
                    datetime.utcnow() + timedelta(days=1))
                token = jwt.encode({
                    'first_name': user.first_name,
                    'user_email': user.email,
                    'user_id': user.id,
                    'last_name': user.last_name,
                    'exp': exp_timestamp,
                    'role': user.role,
                },
                    os.environ['SECRET_KEY']
                )
                return jsonify({'token': token})
            except Exception as e:
                return jsonify({'success': False, 'message': str(e)}), 400
        else:
            # If the password is invalid, return an error message
            return jsonify({'message': 'Invalid password'}), 401

    if school:
        if school.check_password(password):
            # If the password is valid, generate an authentication token
            try:
                exp_timestamp = datetime.timestamp(
                    datetime.utcnow() + timedelta(days=1))
                token = jwt.encode({
                    'first_name': school.school_name,
                    'user_email': school.email,
                    'user_id': school.id,
                    'exp': exp_timestamp,
                    'role': school.role,
                },
                    os.environ['SECRET_KEY']
                )
                return jsonify({'token': token})
            except Exception as e:
                return jsonify({'success': False, 'message': str(e)}), 400
        else:
            # If the password is invalid, return an error message
            return jsonify({'message': 'Invalid password'}), 401
