import React from "react";
import "./Certificate.css";
import PendingIcon from "@mui/icons-material/Pending";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import api from "../../api/api";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Certificate = ({
  student_name,
  student_email,
  school_name,
  school_major,
  school_department,
  school_location,
  handleRequestVerification,
  certificate_status,
  certificate_hash,
  userId,
  completion_data,
  userRole,
  id,
  setCertificateUpdate,
}) => {
  const handleCertificateAddBlockchain = async (certificateId) => {
    if (typeof window.ethereum === "undefined") {
      console.error("Please install MetaMask.");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];

    const data = {
      account: account,
    };

    api
      .post(`/add-certificate/${certificateId}`, data)
      .then((response) => {
        setCertificateUpdate(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCertificateVerifyCertificate = async (certificate_hash, id) => {
    if (typeof window.ethereum === "undefined") {
      console.error("Please install MetaMask.");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];

    const data = {
      account: account,
      certificate_id: id,
    };
    api
      .put(`/verify-certificate/${certificate_hash}`, data)
      .then((response) => {
        setCertificateUpdate(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDownloadPDF = () => {
    const input = document.querySelector(".certificate");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth() - 6; // subtract 3mm on each side
      const pdfHeight = pdf.internal.pageSize.getHeight() - 6; // subtract 3mm on each side
      const imgWidth = imgProps.width;
      const imgHeight = imgProps.height;

      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

      const centerX = (pdfWidth - imgWidth * ratio) / 2 + 3; // add 3mm left margin
      const centerY = (pdfHeight - imgHeight * ratio) / 2 + 3; // add 3mm top margin

      pdf.addImage(
        imgData,
        "PNG",
        centerX,
        centerY,
        imgWidth * ratio,
        imgHeight * ratio,
        null,
        "FAST"
      );

      pdf.save("certificate.pdf");
    });
  };

  return (
    <>
      <div className="certificate">
        <div className="header">
          <h1>Certificate of Completion</h1>
        </div>
        <div className="content">
          <p>This certificate is presented to</p>
          <h2>{student_name}</h2>
          <p>for successfully completing the following course:</p>
          <h3>{school_major}</h3>
          <p>
            with a major in {school_major} and a concentration in{" "}
            {school_department}.
          </p>
          <p>Completed in {school_location}.</p>
          <p>Date of completion: {completion_data}</p>
        </div>
        <div className="footer">
          <p>This certificate is issued by {school_name}.</p>
          {certificate_hash && <p>certificate hash {certificate_hash}. </p>}
          {certificate_status === "unverified" && userRole !== "school" && (
            <button
              onClick={() => {
                handleRequestVerification(id);
              }}
            >
              verification request
            </button>
          )}
          {userRole === "school" && !certificate_hash && (
            <button
              onClick={() => {
                handleCertificateAddBlockchain(id);
              }}
            >
              Add certificate to blockchain
            </button>
          )}
          {userRole === "school" && certificate_hash && (
            <button
              onClick={() => {
                handleCertificateVerifyCertificate(certificate_hash, id);
              }}
            >
              verify certificate
            </button>
          )}
          {certificate_status === "pending" && userRole !== "school" && (
            <PendingIcon />
          )}
          {certificate_status === "verified" && <VerifiedUserIcon />}
        </div>
      </div>
      {certificate_status === "verified" && (
        <button onClick={handleDownloadPDF}>Download PDF</button>
      )}
    </>
  );
};

export default Certificate;
