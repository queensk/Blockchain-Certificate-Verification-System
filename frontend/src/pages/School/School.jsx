import React, { useState } from "react";
import SchoolNavBar from "../../components/SchoolNavBar/SchoolNavBar";
import { UserProfile } from "../../components/UserProfile";
import UserCertificates from "../../components/UserCertificates/UserCertificates";
import ApprovedCertificate from "../../components/ApprovedCertificate/ApprovedCertificate";
import PendingApproval from "../../components/PendingApproval/PendingApproval";
import About from "../../components/About/About";
import "./School.css";

export default function School({
  userId,
  firstName,
  lastName,
  setToken,
  setAuthenticated,
}) {
  const [activeMenu, setActiveMenu] = useState("");

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div className="user-data">
      school
      <SchoolNavBar
        handleMenuClick={handleMenuClick}
        activeMenu={activeMenu}
        setToken={setToken}
        setAuthenticated={setAuthenticated}
      />
      <div className="dummy-nav"></div>
      <div className="User-Main-content">
        {activeMenu === "UserProfile" && <UserProfile userId={userId} />}
        {activeMenu === "UserCertificates" && (
          <UserCertificates
            userId={userId}
            firstName={firstName}
            lastName={lastName}
          />
        )}
        {activeMenu === "ApprovedCertificate" && <ApprovedCertificate />}
        {activeMenu === "PendingApproval" && <PendingApproval />}
        {activeMenu === "About" && <About />}
      </div>
    </div>
  );
}
