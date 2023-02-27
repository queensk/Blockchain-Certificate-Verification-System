// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Certificate {
    struct CertificateData {
        string name;
        string date;
        string issuer;
        bytes32 hash;
    }

    mapping(bytes32 => CertificateData) public certificates;

    function addCertificate(string memory _name, string memory _date, string memory _issuer, bytes32 _hash) public {
        certificates[_hash] = CertificateData(_name, _date, _issuer, _hash);
    }

    function getCertificate(bytes32 _hash) public view returns (CertificateData memory) {
        return certificates[_hash];
    }

    function verifyCertificate(bytes32 _hash) public view returns (bool) {
        return certificates[_hash].hash == _hash;
    }
}
