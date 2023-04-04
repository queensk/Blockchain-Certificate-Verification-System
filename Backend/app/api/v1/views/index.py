#!/usr/bin/python3
"""
Index api route
"""
from flask import jsonify
from app.models.user import User
from app.models.school import School
from app.models.certificate import Certificate
from app.models import storage
from app.api.v1.views import app_views


@app_views.route('/status', methods=['GET'], strict_slashes=False)
def status():
    """
    Status of API
    """
    return jsonify({"status": "OK"})


@app_views.route('/stats', methods=['GET'], strict_slashes=False)
def number_objects():
    """
    Retrieves the number of each objects by type
    """
    classes = [User, School, Certificate]
    names = ["users", "schools", "certificate"]

    num_objs = {}
    for i in range(len(classes)):
        num_objs[names[i]] = storage.count(classes[i])
        num_objs[names[i]+"_increase"] = storage.increase(classes[i])

    num_objs["verified_certificate"] = storage.verified_certificate_count()

    return jsonify(num_objs)
