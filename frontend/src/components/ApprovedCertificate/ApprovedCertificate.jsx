import React from "react";

export default function ApprovedCertificate() {
  const certificates = [
    { name: "Certificate 1", issuer: "Issuer 1", date: "Jan 1, 2022" },
    { name: "Certificate 2", issuer: "Issuer 2", date: "Feb 1, 2022" },
    { name: "Certificate 3", issuer: "Issuer 3", date: "Mar 1, 2022" },
  ];

  return (
    <div>
      <h2>Certificates</h2>
      <ul>
        {certificates.map((certificate, index) => (
          <li key={index}>
            <h3>{certificate.name}</h3>
            <p>Issuer: {certificate.issuer}</p>
            <p>Date: {certificate.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
