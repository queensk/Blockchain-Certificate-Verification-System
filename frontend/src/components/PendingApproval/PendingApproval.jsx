import React, { useState } from "react";
import Certificate from "../Certificate/Certificate";

export default function PendingApproval() {
  const certificates = [
    {
      student_name: "John Smith",
      student_email: "john.smith@example.com",
      school_name: "Computer Science",
      school_major: "Computer Science",
      school_department: "Programming",
      school_location: "Example University",
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
            <Certificate {...certificate} />
            <button onClick={() => handleVerify(index)}>
              Request Verification
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
