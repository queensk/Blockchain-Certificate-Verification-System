#!/usr/bin/python3
"""
Schools AIP action
"""
from app.models import storage
from app.api.v1.views import app_views
from app.models.school import School
from flask import abort, jsonify, make_response, request


@app_views.route('/schools', methods=['GET'], strict_slashes=False)
def get_schools():
    """
    Retrieves the list of all school objects
    or a specific school
    """
    all_schools = storage.all(School).values()
    list_schools = []
    for school in all_schools:
        list_schools.append(school.to_dict())
    return jsonify(list_schools)


@app_views.route('/schools/<school_id>', methods=['GET'], strict_slashes=False)
def get_school(school_id):
    """ Retrieves an school """
    school = storage.get(School, school_id)
    if not school:
        abort(404)

    return jsonify(school.to_dict())


@app_views.route('/schools/<school_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_school(school_id):
    """
    Deletes a school Object
    """

    school = storage.get(School, school_id)

    if not school:
        abort(404)

    storage.delete(school)
    storage.save()

    return make_response(jsonify({}), 200)


@app_views.route('/schools', methods=['POST'], strict_slashes=False)
def post_school():
    """
    Creates a school
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'email' not in request.get_json():
        abort(400, description="Missing email")
    if 'password' not in request.get_json():
        abort(400, description="Missing password")

    data = request.get_json()
    instance = School(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)


@app_views.route('/schools/<school_id>', methods=['PUT'], strict_slashes=False)
def put_school(school_id):
    """
    Updates a school
    """
    school = storage.get(School, school_id)
    data = request.get_json()
    print(data)
    if not school:
        abort(404)

    if not data:
        abort(400, description="Not a JSON")

    ignore = ['id', 'created_at', 'updated_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(school, key, value)
    storage.save()
    return make_response(jsonify(school.to_dict()), 200)
