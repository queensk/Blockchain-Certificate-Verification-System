import os
from functools import wraps
import jwt
import datetime
from flask import request, jsonify

# Set the secret key used to encode and decode the JWT token
SECRET_KEY = os.environ['SECRET_KEY']


def require_auth(func):
    """
    Decorator to require a valid JWT token in the request header
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify({'message': 'Authorization required'}), 401
        if auth_header:
            try:
                # Extract the JWT token from the 'Authorization' header
                token = auth_header.split(' ')[1]

                decoded = jwt.decode(token, os.environ['SECRET_KEY'])
            except Exception as e:
                # If the token is invalid or has expired, return an error
                # message
                return jsonify({'message': 'Invalid token'}), 401
            # Check if the token has expired
            if decoded['exp'] < datetime.datetime.utcnow().timestamp():
                return jsonify({'message': 'Token expired'}), 401
            # If the token is valid and has not expired, call the decorated
            # function
            return func(*args, **kwargs)
        else:
            # If the 'Authorization' header is not present, return an error
            # message
            return jsonify({'message': 'Unauthorized'}), 401
    return wrapper
