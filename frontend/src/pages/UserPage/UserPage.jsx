import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { UserProfile } from "../../components/UserProfile";
import UserCertificates from "../../components/UserCertificates/UserCertificates";
import ApprovedCertificate from "../../components/ApprovedCertificate/ApprovedCertificate";
import PendingApproval from "../../components/PendingApproval/PendingApproval";
import About from "../../components/About/About";
import "./UserPage.css";

export default function UserPage({
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
      <NavBar
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
