#!/usr/bin/python3
"""
Admin user routes
"""
from flask import jsonify, request, make_response, abort
from app.models.admin import Admin
from app.models import storage
from app.api.v1.views import app_views
from datetime import datetime, timedelta 
import jwt
import os


@app_views.route('/login-admin', methods=['POST'])
def admin_login():
    # Get the provided username and password from the request
    data = request.get_json()
    print(data)
    # Check if the password field is empty
    if 'password' not in data or not data['password']:
        return jsonify({'message': 'Password field is required'}), 400

    # Check if the userMail field is empty
    if 'userMail' not in data or not data['userMail']:
        return jsonify({'message': 'Email field is required'}), 400

    # Retrieve the username and password from the request data
    user_mail = data.get('userMail')
    password = data.get('password')
    admin = storage.get_email(Admin, user_mail)
    if not admin:
        return jsonify({'message': 'Invalid email or password'}), 401

    if admin:
        if admin.check_password(password):
            # If the password is valid, generate an authentication token
            try:
                exp_timestamp = datetime.timestamp(
                    datetime.utcnow() + timedelta(days=1))
                
                token = jwt.encode({
                    'user_name': admin.username,
                    'user_email': admin.email,
                    'user_id': admin.id,
                    'is_superadmin': admin.is_superadmin,
                    'exp': exp_timestamp,
                    'role': admin.role,
                },
                    os.environ['SECRET_KEY']
                )
                return jsonify({'token': token})
            except Exception as e:
                return jsonify({'success': False, 'message': str(e)}), 400
        else:
            # If the password is invalid, return an error message
            return jsonify({'message': 'Invalid email or password'}), 401


@app_views.route('/admins', methods=['GET'], strict_slashes=False)
def get_admins():
    """
    Retrieves the list of all admin objects
    or a specific admin
    """
    all_admins = storage.all(Admin).values()
    list_admins = []
    for admin in all_admins:
        list_admins.append(admin.to_dict())
    return jsonify(list_admins)


@app_views.route('/admins/<admin_id>', methods=['GET'], strict_slashes=False)
def get_admin(admin_id):
    """ 
    Retrieves an admin
    """
    admin = storage.get(Admin, admin_id)
    if not admin:
        abort(404)

    return jsonify(admin.to_dict())


@app_views.route('/admins/<admin_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_admin(admin_id):
    """
    Deletes an admin Object
    """

    admin = storage.get(Admin, admin_id)

    if not admin:
        abort(404)

    storage.delete(admin)
    storage.save()

    return make_response(jsonify({}), 200)


@app_views.route('/admins', methods=['POST'], strict_slashes=False)
def post_admin():
    """
    Creates an admin
    """
    data = request.get_json()

    if not data:
        abort(400, description="Not a JSON")

    if not data['email']:
        abort(400, description="Missing email")
    if not data['password']:
        abort(400, description="Missing password")

    instance = Admin(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)

@app_views.route('/admins/<admin_id>', methods=['PUT'], strict_slashes=False)
def put_admin(admin_id):
    """
    Updates an admin
    """
    admin = storage.get(Admin, admin_id)

    if not admin:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'created_at', 'updated_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(admin, key, value)
    storage.save()
    return make_response(jsonify(admin.to_dict()), 200)
