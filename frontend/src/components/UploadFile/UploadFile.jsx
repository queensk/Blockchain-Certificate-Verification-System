import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "../../config/firebase/firebaseConfig";
import PDFDataExtractor from "../PDFDataExtractor/PDFDataExtractor";
import api from "../../api/api.jsx";
import ErrorPopUp from "../MessagePopUp/MessagePopUp";
import Certificate from "../Certificate/Certificate";

export default function UploadFile({ userId, firstName, lastName, userRole }) {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [downloadURL, setDownloadURL] = useState(null);
  const [pdfData, setPdfData] = useState({});
  const [error, setError] = useState(false);
  const [certificateUploadData, setCertificateUploadData] = useState(null);
  const [verificationRequested, setVerificationRequested] = useState(false);

  const data = {
    pdfURL: downloadURL,
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    setFile(file);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      return;
    }
    const storageRef = ref(
      storage,
      `${firstName + lastName + "-" + userId}/${"certificate"}/${file.name}`
    );
    uploadBytes(storageRef, file)
      .then(() => getDownloadURL(storageRef))
      .then((downloadURL) => {
        setDownloadURL(downloadURL);
      })
      .then(() => {
        if (downloadURL) {
          api
            .post("/pdf-data", data)
            .then((response) => {
              setPdfData(response.data);
            })
            .catch((error) => {
              setError("OOPS! a network error occurred");
            });
        }
      })
      .catch((error) => setError("OOPS! a network error occurred"));
  };

  const handleRequestVerification = (certificateId) => {
    setVerificationRequested(true);
    if (userRole === "school") {
      const verify = {
        certificate_status: "verified",
      };

      api
        .post(`/add-certificate/${certificateId}`, verify)
        .then((response) => {
          setCertificateUploadData(response.data);
          // console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const verify = {
        certificate_status: "pending",
      };

      api
        .post(`/certificate/${certificateId}/request/verify`, verify)
        .then((response) => {
          setCertificateUploadData(response.data);
          // console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      {error && <ErrorPopUp message={error} setMessage={setError} />}
      <div className="upload-certificate">
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{
            border: `2px dashed ${dragging ? "blue" : "black"}`,
            padding: "16px",
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />
          </form>
          {file && <p>Selected file: {file.name}</p>}
        </div>
        <button type="submit" onClick={handleSubmit}>
          Upload PDF
        </button>
      </div>
      <PDFDataExtractor
        pdfData={pdfData}
        setCertificateUploadData={setCertificateUploadData}
      />
      {!verificationRequested && certificateUploadData && (
        <div className="certificate-user-data">
          <Certificate
            {...certificateUploadData}
            handleRequestVerification={handleRequestVerification}
          />
        </div>
      )}
    </>
  );
}
