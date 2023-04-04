import React, { useState, useEffect } from "react";
import Certificate from "../Certificate/Certificate";
import api from "../../api/api";
import LoadingAnimation from "../Loading/Loading";

export default function PendingApproval({ userId, userRole }) {
  const [certificates, setCertificates] = useState([]);
  const [certificateUpdate, setCertificateUpdate] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/users/${userId}/certificate`)
      .then((response) => {
        setCertificates(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId, certificateUpdate]);

  const handleRequestVerification = (certificateId) => {
    const verify = {
      certificate_status: "pending",
    };

    api
      .post(`/certificate/${certificateId}/request/verify`, verify)
      .then((response) => {
        setCertificateUpdate(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="user-certificates">
      <h2>Certificates</h2>
      {loading ? (
        <LoadingAnimation />
      ) : certificates.filter(
          (certificate) => certificate.verified_certificate === false
        ).length === 0 ? (
        <p className="no-certificates">No certificates found</p>
      ) : (
        <ul>
          {certificates
            .filter((certificate) => certificate.verified_certificate === false)
            .map((certificate, index) => (
              <li key={index}>
                <Certificate
                  {...certificate}
                  handleRequestVerification={handleRequestVerification}
                  userRole={userRole}
                  setCertificateUpdate={setCertificateUpdate}
                />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
