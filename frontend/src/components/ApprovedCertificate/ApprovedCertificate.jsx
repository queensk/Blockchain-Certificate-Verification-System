import React, { useEffect, useState } from "react";
import Certificate from "../Certificate/Certificate";
import api from "../../api/api";
import LoadingAnimation from "../Loading/Loading";

export default function ApprovedCertificate({ userId }) {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/users/${userId}/certificate`)
      .then((response) => {
        setCertificates(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  return (
    <div className="user-certificates">
      <h2>Certificates</h2>
      {loading ? (
        <LoadingAnimation />
      ) : certificates.filter(
          (certificate) => certificate.verified_certificate === true
        ).length > 0 ? (
        <ul>
          {certificates
            .filter((certificate) => certificate.verified_certificate === true)
            .map((certificate, index) => (
              <li key={index}>
                <Certificate {...certificate} />
              </li>
            ))}
        </ul>
      ) : (
        <p className="no-certificates">No certificates found</p>
      )}
    </div>
  );
}
