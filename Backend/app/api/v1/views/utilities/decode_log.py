# from sha3 import keccak_256
import json
import urllib.request
import ssl
import eth_abi
from eth_utils import decode_hex
import re


def format_raw_data(logs, event_name):
    with open("/home/queens/Blockchain-Certificate-Verification-System/Backend/contracts/artifacts/contracts/Certificate.sol/CertificateVerifier.json") as f:
        data = json.load(f)
    abi = data['abi']
    types = []
    names = []
    indexed_types = []
    indexed_names = []
    for elem in abi:
        if 'name' in elem and elem['name'] == event_name:
            for input in elem['inputs']:
                if input['indexed']:
                    indexed_types.append(input["type"])
                    indexed_names.append(input["name"])
                else:
                    types.append(input["type"])
                    names.append(input["name"])
            break
    for log in logs:
        print(log['topics'][1:])
        encoded_topics = [decode_hex(topic) if isinstance(topic, str) and re.match(
            '^0x[0-9a-fA-F]+$', topic) else topic for topic in log['topics'][1:]]
        print(encoded_topics)
        indexed_values = [
            eth_abi.decode(
                t, v) for t, v in zip(
                indexed_types, encoded_topics)]
        values = eth_abi.decode_abi(types, decode_hex(log['data']))
        print("Data: ", dict(zip(names, values)))

        # Convert integer values to Python integers using int.from_bytes()
        for i, value in enumerate(values):
            if types[i] == 'uint256':
                values[i] = int.from_bytes(value, byteorder='big')

        log_data = {}
        for i, name in enumerate(names):
            log_data[name] = values[i]

        for i, name in enumerate(indexed_names):
            log_data[name] = indexed_values[i]

        print("Data: ", log_data)
