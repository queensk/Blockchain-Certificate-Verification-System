#!/usr/bin/python3
"""
Certificate connection route to contract
"""
from web3 import Web3
from flask import jsonify, request, abort
import json
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
contract = w3.eth.contract(address=contract_address, abi=contract_abi, bytecode=bytecode)

# Flask routes
@app_views.route('/add-certificate', methods=['POST'])
def add_contract_certificate():
    """
    Add new certificate to contract
    """
    try:
        # Get the certificate data from the request body
        if not request.get_json():
            abort(400, description="Not a JSON")

        certificate_data = request.json
        name = certificate_data['student_name']
        school_name = certificate_data['school_name']
        school_major = certificate_data['school_major']
        school_department = certificate_data['school_department']

        # Generate the certificate hash
        certificate_data_string = f"{name}{school_name}{school_major}{school_department}"
        certificate_hash = generate_keccak256_hash(certificate_data_string)

        # Get the account that will send the transaction
        account = w3.eth.accounts[0]

        # Build the transaction to add the certificate to the contract
        tx_hash = contract.functions.addCertificate(name, school_name, school_major, school_department, certificate_hash).transact({
            'from': account,
        })

        # Wait for the transaction to be mined
        receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        if not receipt:
            abort(404, description="Failed minting of certificate")

        certificate_info = contract.functions.getCertificateInfo(certificate_hash).call()
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

        return jsonify({'success': True, 'certificate_data': response})

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
        certificate_info = contract.functions.getCertificateInfo(bytes.fromhex(certificate_hash)).call()
        
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

@app_views.route('/verify-certificate/<string:certificate_hash>', methods=['PUT'])
def verify_contract_certificate(certificate_hash):
    """
    Verify a certificate
    """
    try:
        account = w3.eth.accounts[0]
        tx_hash = contract.functions.verifyCertificate(bytes.fromhex(certificate_hash)).transact({
            'from': account,
        })
        receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        if not receipt:
            return jsonify({'success': False, 'message': 'Transaction failed to execute.'}), 400
        certificate_info = contract.functions.getCertificateInfo(bytes.fromhex(certificate_hash)).call()
        response = {
            'certificate_hash': certificate_info[0].hex(),
            'student_name': certificate_info[1],
            'school_name': certificate_info[2],
            'school_major': certificate_info[3],
            'school_department': certificate_info[4],
            'certificate_verify': certificate_info[5],
        }
        return jsonify({'success': True, 'verified': response})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 400
