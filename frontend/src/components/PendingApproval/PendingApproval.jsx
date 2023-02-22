import React, { useState } from "react";

export default function PendingApproval() {
  const certificates = [
    {
      name: "Certificate 1",
      issuer: "Issuer 1",
      date: "Jan 1, 2022",
      verified: false,
    },
    {
      name: "Certificate 2",
      issuer: "Issuer 2",
      date: "Feb 1, 2022",
      verified: true,
    },
    {
      name: "Certificate 3",
      issuer: "Issuer 3",
      date: "Mar 1, 2022",
      verified: false,
    },
  ];

  const [certificateList, setCertificateList] = useState(certificates);

  const handleVerify = (index) => {
    const newCertificateList = [...certificateList];
    newCertificateList[index].verified = true;
    setCertificateList(newCertificateList);
  };

  return (
    <div>
      <h2>Certificates</h2>
      <ul>
        {certificateList.map((certificate, index) => (
          <li key={index}>
            <h3>{certificate.name}</h3>
            <p>Issuer: {certificate.issuer}</p>
            <p>Date: {certificate.date}</p>
            {certificate.verified ? (
              <p>Verified</p>
            ) : (
              <button onClick={() => handleVerify(index)}>Verify</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
