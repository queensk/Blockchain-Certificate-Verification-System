import React from "react";
import "./About.css";

export default function About() {
  return (
    <>
      <div className="about-component">
        <h2>Academic Certificate Verification Platform Using Blockchain</h2>
        <p>
          The academic certificate verification platform using blockchain
          technology is used to issue, manage and verify academic certificates
          in a secure and distributed manner. This project addresses the need
          for a secure digital platform to issue and verify academic
          certificates without intervention from the original certificate issuer
          (University).
        </p>
        <p>The core functionality of this application are:</p>
        <ul>
          <li>Create and issue academic certificates.</li>
          <li>Manage and share academic certificates.</li>
          <li>Verify authenticity of shared certificates.</li>
        </ul>
        <p>The users of the platform include:</p>
        <ul>
          <li>
            Universities: issue academic certificates, view academic
            certificates issued, endorse verification and digitally sign
            academic certificates.
          </li>
          <li>
            Students: receive academic certificates from universities, view and
            manage received academic certificates, share academic certificates
            with third party verifiers, selective disclosure of certificate
            data.
          </li>
          <li>
            Verifier: receive certificate data from students, verify certificate
            authenticity with blockchain platform.
          </li>
        </ul>
        <p>Features:</p>
        <ul>
          <li>
            A distributed and automated system for background verification.
          </li>
          <li>Data immutability is one of the main features of blockchain.</li>
          <li>
            It serves as a large public ledger where node in network verifies
            and save the same data.
          </li>
          <li>
            The process of certificate generation is an open and transparent
            system where any organization can verify information of any
            certificate using this system.
          </li>
          <li>
            The system helps in eradicating problems of fake certificates.
          </li>
        </ul>
      </div>
    </>
  );
}
