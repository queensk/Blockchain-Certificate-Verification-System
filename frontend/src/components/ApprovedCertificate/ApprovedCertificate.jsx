import React from "react";
import Certificate from "../Certificate/Certificate";

export default function ApprovedCertificate() {
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

  return (
    <div>
      <h2>Certificates</h2>
      <ul>
        {certificates.map((certificate, index) => (
          <li key={index}>
            <Certificate {...certificate} />
          </li>
        ))}
      </ul>
    </div>
  );
}
