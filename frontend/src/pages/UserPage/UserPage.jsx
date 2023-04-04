import React, { useState, useContext } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { UserProfile } from "../../components/UserProfile";
import UserCertificates from "../../components/UserCertificates/UserCertificates";
import ApprovedCertificate from "../../components/ApprovedCertificate/ApprovedCertificate";
import PendingApproval from "../../components/PendingApproval/PendingApproval";
import About from "../../components/About/About";
import "./UserPage.css";
import { AuthContext } from "../../CustomHooks/Context/AuthProvider";
import Footer from "../../components/Footer/Footer";

export default function UserPage() {
  const [activeMenu, setActiveMenu] = useState("UserProfile");
  const {
    authenticated,
    userId,
    firstName,
    lastName,
    userRole,
    setToken,
    setAuthenticated,
  } = useContext(AuthContext);
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
        {activeMenu === "ApprovedCertificate" && (
          <ApprovedCertificate userId={userId} />
        )}
        {activeMenu === "PendingApproval" && (
          <PendingApproval userId={userId} />
        )}
        {activeMenu === "About" && <About />}
        <Footer />
      </div>
    </div>
  );
}
