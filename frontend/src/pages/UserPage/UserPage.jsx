import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { UserProfile } from "../../components/UserProfile";
import UserCertificates from "../../components/UserCertificates/UserCertificates";
import ApprovedCertificate from "../../components/ApprovedCertificate/ApprovedCertificate";
import "./UserPage.css";

export default function UserPage() {
  const [activeMenu, setActiveMenu] = useState("");

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div className="user-data">
      <NavBar handleMenuClick={handleMenuClick} activeMenu={activeMenu} />
      <div className="dummy-nav"></div>
      <div className="User-Main-content">
        {activeMenu === "UserProfile" && <UserProfile />}
        {activeMenu === "UserCertificates" && <UserCertificates />}
        {activeMenu === "ApprovedCertificate" && <ApprovedCertificate />}
      </div>
    </div>
  );
}
