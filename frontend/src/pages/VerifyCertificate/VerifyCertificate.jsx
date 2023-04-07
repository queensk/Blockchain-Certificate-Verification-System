import React, { useState } from "react";
import Certificate from "../../components/Certificate/Certificate";
import Footer from "../../components/Footer/Footer";
import api from "../../api/api";
import "./VerifyCertificate.css";

export default function VerifyCertificate() {
  const [inputValue, setInputValue] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [notVerified, setNotVerified] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    api
      .get(`/get-certificate/${inputValue}`)
      .then((response) => {
        if (response?.data?.success === true) {
          setCertificate(response?.data?.certificate_data);
          console.log(response?.data?.certificate_data);
        } else {
          setNotVerified(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setNotVerified(true);
      })
      .finally(() => {
        setInputValue("");
      });
    setInputValue("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter certificate hash"
            />
            <button type="submit">Check</button>
          </div>
          <p>
            To verify your certificate, please enter your certificate hash in
            the input field below and click on the submit button.
          </p>
          {notVerified && (
            <p className="not-verified">Certificate not verified</p>
          )}
        </form>
        {certificate && (
          <div className="certificate">
            <div className="header">
              <h1>Certificate of Completion</h1>
            </div>
            <div className="content">
              <p>This certificate is presented to</p>
              <h2>{certificate?.student_name}</h2>
              <p>for successfully completing the following course:</p>
              <h3>{certificate?.school_major}</h3>
              <p>
                with a major in {certificate?.school_major} and a concentration
                in {certificate?.school_department}.
              </p>
              {/* <p>Completed in {school_location}.</p> */}
              {/* <p>Date of completion: {completion_data}</p> */}
            </div>
            <div className="footer">
              <p>This certificate is issued by {certificate?.school_name}.</p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
