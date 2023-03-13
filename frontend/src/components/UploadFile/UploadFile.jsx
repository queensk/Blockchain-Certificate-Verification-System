import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "../../config/firebase/firebaseConfig";
import PDFDataExtractor from "../PDFDataExtractor/PDFDataExtractor";
import api from "../../api/api";
import ErrorPopUp from "../MessagePopUp/MessagePopUp";

export default function UploadFile({ userId, firstName, lastName }) {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [downloadURL, setDownloadURL] = useState(null);
  const [pdfData, setPdfData] = useState({});
  const [error, setError] = useState(false);

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
      <PDFDataExtractor pdfData={pdfData} />
    </>
  );
}
