// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract CertificateVerifier {
    
    // Structure to hold information about each certificate
    struct Certificate {
        bytes32 certificateHash; // Hash of the certificate data
        string studentName; // Name of the student associated with the certificate
        string schoolName; // Name of the school associated with the certificate
        string schoolMajor; // Major of the student associated with the certificate
        string schoolDepartment; // Department of the school associated with the certificate
        bool verified; // Whether the certificate has been verified
    }

    // Mapping to store certificates by their hash
    mapping(bytes32 => Certificate) private certificates;

    // Event to be emitted when a certificate is verified
    event CertificateVerified(bytes32 certificateHash);

    // Event to be emitted when a certificate is added
    event CertificateAdded(bytes32 indexed certificateHash, string studentName, string schoolName, string schoolMajor, string schoolDepartment);

    // Function to add a new certificate to the mapping
    function addCertificate(string memory _studentName, string memory _schoolName, string memory _schoolMajor, string memory _schoolDepartment, bytes32 _certificateHash) public {
        certificates[_certificateHash] = Certificate(_certificateHash, _studentName, _schoolName, _schoolMajor, _schoolDepartment, false);
        
        emit CertificateAdded(_certificateHash, _studentName, _schoolName, _schoolMajor, _schoolDepartment);
    }

    // Function to verify a certificate
    function verifyCertificate(bytes32 _certificateHash) public {
        require(certificates[_certificateHash].verified == false, "Certificate has already been verified");

        certificates[_certificateHash].verified = true;
        emit CertificateVerified(_certificateHash);
    }

    // Function to get the information associated with a certificate
    function getCertificateInfo(bytes32 _certificateHash) public view returns (bytes32, string memory, string memory, string memory, string memory, bool) {
        return (certificates[_certificateHash].certificateHash, certificates[_certificateHash].studentName, certificates[_certificateHash].schoolName, certificates[_certificateHash].schoolMajor, certificates[_certificateHash].schoolDepartment, certificates[_certificateHash].verified);
    }
}
