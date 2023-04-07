#!/usr/bin/python3
"""
Certificate connection route to contract
"""
from web3 import Web3
from flask import jsonify, request, abort
import json
import os
from datetime import datetime
from app.models import storage
from app.models.certificate import Certificate
from app.models.certificate_request_verification import VerifyCertificate
from app.api.v1.views import app_views
from app.api.v1.views.utilities.encode import generate_keccak256_hash
from eth_abi import decode
    
# Initialize Flask app and Web3 provider
with open('/home/queens/Blockchain-Certificate-Verification-System/Backend/contracts/artifacts/contracts/Certificate.sol/CertificateVerifier.json') as f:
    certificate_json = json.load(f)

contract_abi = certificate_json['abi']
bytecode = certificate_json['bytecode']

w3 = Web3(Web3.HTTPProvider('http://localhost:8545'))
contract_address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
contract = w3.eth.contract(
    address=contract_address,
    abi=contract_abi,
    bytecode=bytecode)

# Flask routes


@app_views.route('/add-certificate/<certificate_id>', methods=['POST'])
def add_contract_certificate(certificate_id):
    """
    Add new certificate to contract
    """
    try:
        # Get the certificate data from the request body
        if not request.get_json():
            abort(400, description="Not a JSON")

        data = request.get_json()
        certificate = storage.get(Certificate, certificate_id)
        # certificate_data = request.json
        name = certificate.student_name
        school_name = certificate.school_name
        school_major = certificate.school_major
        school_department = certificate.school_department

        # Generate the certificate hash
        certificate_data_string = f"{name}{school_name}{school_major}{school_department}{certificate_id}{datetime.utcnow()}{os.environ['SECRET_KEY']}"
        certificate_hash = generate_keccak256_hash(certificate_data_string)

        # Get the account that will send the transaction
        # account = w3.eth.accounts[0]
        account = Web3.to_checksum_address(data['account'])

        # Build the transaction to add the certificate to the contract
        tx_hash = contract.functions.addCertificate(
            name,
            school_name,
            school_major,
            school_department,
            certificate_hash).transact(
            {
                'from': account,
            })

        # Wait for the transaction to be mined
        receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        if not receipt:
            abort(404, description="Failed minting of certificate")

        certificate_info = contract.functions.getCertificateInfo(
            certificate_hash).call()
        if not certificate_info:
            abort(404, description="Certificate not created successfully")


        # Construct the response JSON
        response = {
            'certificate_hash': certificate_info[0].hex(),
            'student_name': certificate_info[1],
            'school_name': certificate_info[2],
            'school_major': certificate_info[3],
            'school_department': certificate_info[4],
            'verified': certificate_info[5],
        }
        setattr(certificate, "certificate_hash", certificate_info[0].hex())
        certificate_verification_status = storage.get_certificates_status(VerifyCertificate, certificate.id)
        setattr(certificate_verification_status, "certificate_status", "pending")
        storage.save()


        return jsonify({'success': True, 'certificate_data': certificate.to_dict()})

    except ValueError as e:
        abort(400, description=str(e))
    except Exception as e:
        abort(500, description=str(e))


@app_views.route('/get-certificate/<string:certificate_hash>', methods=['GET'])
def get_contract_certificate(certificate_hash):
    """
    Get a certificate from the contract
    """
    try:
        # Get certificate data from contract function
        certificate_info = contract.functions.getCertificateInfo(
            bytes.fromhex(certificate_hash)).call()

        # Construct the response JSON
        response = {
            'certificate_hash': certificate_info[0].hex(),
            'student_name': certificate_info[1],
            'school_name': certificate_info[2],
            'school_major': certificate_info[3],
            'school_department': certificate_info[4],
            'certificate_verify': certificate_info[5],
        }

        return jsonify({'success': True, 'certificate_data': response})

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 400


@app_views.route('/verify-certificate/<string:certificate_hash>',
                 methods=['PUT'])
def verify_contract_certificate(certificate_hash):
    """
    Verify a certificate
    """
    try:
        data = request.get_json()
        # account = w3.eth.accounts[0]
        certificate = storage.get(Certificate, data['certificate_id'])
        account = Web3.to_checksum_address(data['account'])
        tx_hash = contract.functions.verifyCertificate(
            bytes.fromhex(certificate_hash)).transact({'from': account, })
        receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        if not receipt:
            return jsonify(                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
                {'success': False, 'message': 'Transaction failed to execute.'}), 400
        certificate_info = contract.functions.getCertificateInfo(
            bytes.fromhex(certificate_hash)).call()
        response = {
            'certificate_hash': certificate_info[0].hex(),
            'student_name': certificate_info[1],
            'school_name': certificate_info[2],
            'school_major': certificate_info[3],
            'school_department': certificate_info[4],
            'certificate_verify': certificate_info[5],
        }
        certificate_data = certificate.to_dict()

        for key, value in certificate_data.items():
            if key not in response:
                response["key"] = value
        setattr(certificate, "verified_certificate", certificate_info[5])
        certificate_verification_status = storage.get_certificates_status(VerifyCertificate, certificate.id)
        setattr(certificate_verification_status, "certificate_status", "verified")
        storage.save()

        return jsonify({'success': True, 'verified': response})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 400
