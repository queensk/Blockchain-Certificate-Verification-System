import React from "react";
import "./UserCertificates.css";
import UploadFile from "../UploadFile/UploadFile";

export default function UserCertificates() {
  return (
    <div className="user-certificates">
      <h1>Upload PDF certificate for verifications</h1>
      <UploadFile />
    </div>
  );
}
