#!/usr/bin/python3
"""
Schools AIP action
"""
from app.models import storage
from app.api.v1.views import app_views
from app.models.certificate import Certificate
from flask import abort, jsonify, make_response, request


@app_views.route('/certificates', methods=['GET'], strict_slashes=False)
def get_certificate():
    """
    Retrieves the list of all certificate objects
    or a specific certificate
    """
    all_certificates = storage.all(Certificate).values()
    list_certificates = []
    for certificate in all_certificates:
        list_certificates.append(certificate.to_dict())
    return jsonify(list_certificates)


@app_views.route('/certificate/<certificate_id>',
                 methods=['GET'], strict_slashes=False)
def get_Certificate(certificate_id):
    """ Retrieves an Certificate """
    certificate = storage.get(Certificate, certificate_id)
    if not certificate:
        abort(404)
    return jsonify(certificate.to_dict())


@app_views.route('/certificates/<certificate_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_Certificate(certificate_id):
    """
    Deletes a certificate Object
    """

    certificate = storage.get(Certificate, certificate_id)

    if not certificate:
        abort(404)

    storage.delete(certificate)
    storage.save()

    return make_response(jsonify({}), 200)


@app_views.route('/certificates', methods=['POST'], strict_slashes=False)
def post_certificate():
    """
    Creates a certificate
    """
    data = request.get_json()
    if not data:
        abort(400, description="Not a JSON")
    if 'student_name' not in data:
        abort(400, description="student_name")
    if 'student_email' not in data:
        abort(400, description="Missing student email")
    if "school_id" not in data:
        abort(400, 'Missing school id')
    if "school_name" not in data:
        abort(400, 'Missing school name')
    if "school_major" not in data:
        abort(400, 'Missing school major')
    if "school_department" not in data:
        abort(400, "Missing school department")
    if "school_location" not in data:
        abort(400, "MIssing school location")

    instance = Certificate(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)


@app_views.route('/certificates/<certificate_id>',
                 methods=['PUT'], strict_slashes=False)
def put_certificate(certificate_id):
    """
    Updates a certificate
    """
    certificate = storage.get(Certificate, certificate_id)

    if not certificate:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'email', 'created_at', 'updated_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(certificate, key, value)
    storage.save()
    return make_response(jsonify(certificate.to_dict()), 200)
