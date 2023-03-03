#!/usr/bin/python3
"""
Generate keccak256 hash
"""
from web3 import Web3
import hashlib


def generate_keccak256_hash(string):
    keccak = hashlib.sha3_256()
    keccak.update(string.encode('utf-8'))
    return Web3.to_bytes(hexstr=keccak.hexdigest())
