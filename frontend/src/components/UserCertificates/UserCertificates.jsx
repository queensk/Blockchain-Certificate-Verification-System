import React from "react";
import "./UserCertificates.css";
import UploadFile from "../UploadFile/UploadFile";

export default function UserCertificates({ userId, firstName, userRole, lastName }) {
  return (
    <div className="user-certificates">
      <h1>Upload PDF certificate for verifications</h1>
      <UploadFile
        userId={userId}
        firstName={firstName}
        lastName={lastName}
        userRole={userRole}
      />
    </div>
  );
}
