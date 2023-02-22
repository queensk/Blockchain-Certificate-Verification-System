import React, { useState } from "react";

export default function UploadFile() {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);

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
    // code to handle file upload
    console.log(file);
  };

  return (
    <>
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
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
        </form>
        {file && <p>Selected file: {file.name}</p>}
      </div>
      <button type="submit">Upload PDF</button>
    </>
  );
}
