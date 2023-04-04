import React, { useState, useContext } from "react";
import SchoolNavBar from "../../components/SchoolNavBar/SchoolNavBar";
import SchoolProfile from "../../components/SchoolProfile/SchoolProfile";
import UserCertificates from "../../components/UserCertificates/UserCertificates";
import ApprovedCertificate from "../../components/ApprovedCertificate/ApprovedCertificate";
import PendingApproval from "../../components/PendingApproval/PendingApproval";
import About from "../../components/About/About";
import "./School.css";
import { AuthContext } from "../../CustomHooks/Context/AuthProvider";
import Footer from "../../components/Footer/Footer";

export default function School() {
  const [activeMenu, setActiveMenu] = useState("UserProfile");
  const {
    token,
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
      <SchoolNavBar
        handleMenuClick={handleMenuClick}
        activeMenu={activeMenu}
        setToken={setToken}
        setAuthenticated={setAuthenticated}
      />
      <div className="dummy-nav"></div>
      <div className="User-Main-content">
        {activeMenu === "UserProfile" && <SchoolProfile userId={userId} />}
        {activeMenu === "UserCertificates" && (
          <UserCertificates
            userId={userId}
            firstName={firstName}
            lastName={lastName}
            userRole={userRole}
          />
        )}
        {activeMenu === "ApprovedCertificate" && (
          <ApprovedCertificate userId={userId} />
        )}
        {activeMenu === "PendingApproval" && (
          <PendingApproval userId={userId} userRole={userRole} />
        )}
        {activeMenu === "About" && <About />}
        <Footer />
      </div>
    </div>
  );
}
