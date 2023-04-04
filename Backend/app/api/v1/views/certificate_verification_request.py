#!/usr/bin/python3
"""
Certificate verify request AIP action
"""
from app.models import storage
from app.api.v1.views import app_views
from app.models.certificate import Certificate
from app.models.certificate_request_verification import VerifyCertificate
from flask import abort, jsonify, make_response, request


@app_views.route('/certificate/<certificate_id>/request/verify', methods=['POST'], strict_slashes=False)
def request_user_certificate_verification(certificate_id):
    """
    Retrieves the list of all certificate objects
    for a specific user
    """
    data = request.get_json()

    certificate = storage.get(Certificate, certificate_id)
    if not data:
        abort(400, description="Not a JSON")
    if not certificate:
        abort(400, description="Certificate not found")

    data['user_id'] = certificate.user_id
    data['school_id'] = certificate.school_id
    data['certificate_id'] = certificate_id
    instance = VerifyCertificate(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)
