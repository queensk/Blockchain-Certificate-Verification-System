#!/usr/bin/python3
"""
Schools AIP action
"""
from app.models import storage
from app.api.v1.views import app_views
from app.models.certificate import Certificate
from app.models.certificate_request_verification import VerifyCertificate
from flask import abort, jsonify, make_response, request


@app_views.route('/certificate', methods=['GET'], strict_slashes=False)
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


@app_views.route('/users/<user_id>/certificate', methods=['GET'], strict_slashes=False)
def get_user_certificate(user_id):
    """
    Retrieves the list of all certificate objects
    for a specific user
    """
    all_certificates = storage.get_user_certificates(Certificate, user_id)
    if not all_certificates:
        abort(404, "No certificate was found")
    list_certificates = []
    for certificate in all_certificates:
        certificate_verification_status = storage.get_certificates_status(VerifyCertificate, certificate.id)
        certificate_data = certificate.to_dict()
        certificate_data["certificate_status"] = certificate_verification_status.certificate_status
        list_certificates.append(certificate_data)
    return jsonify(list_certificates)


@app_views.route('certificate/<certificate_id>',
                 methods=['GET'], strict_slashes=False)
def get_Certificate(certificate_id):
    """ Retrieves an Certificate """
    certificate = storage.get(Certificate, certificate_id)
    if not certificate:
        abort(404)
    return jsonify(certificate.to_dict())


@app_views.route('/users/<user_id>/certificates/<certificate_id>', methods=['DELETE'],
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


@app_views.route('/users/<user_id>/certificates', methods=['POST'], strict_slashes=False)
def post_certificate(user_id):
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

    data['user_id'] = user_id
    instance = Certificate(**data)
    certificate_status = {
        "user_id": user_id,
        "school_id": instance.school_id,
        "certificate_id": instance.id
    }
    status = VerifyCertificate(**certificate_status)
    instance.save()
    status.save()
    certificate = instance.to_dict()  
    certificate["certificate_status"] = status.certificate_status
    return make_response(jsonify(certificate), 201)


@app_views.route('/users/<user_id>/certificates/<certificate_id>',
                 methods=['PUT'], strict_slashes=False)
def put_certificate(user_id, certificate_id):
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
