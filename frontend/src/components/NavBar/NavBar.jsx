import React from "react";
import logo from "./Logo.svg";
import "./NavBar.css";
import { TbCertificate } from "react-icons/tb";
import { FcAbout, FcApproval, FcClock } from "react-icons/fc";
import { BsPersonFill } from "react-icons/bs";

export default function NavBar({
  handleMenuClick,
  activeMenu,
  setToken,
  setAuthenticated,
}) {
  const handleLogOut = () => {
    localStorage.removeItem("appCertificate");
    setAuthenticated(false);
    setToken(null);
  };
  return (
    <nav className="sidebar-container">
      <div className="sidebar">
        <div className="NavBar">
          <img src={logo} alt="Logo" />
        </div>
        <div
          className={
            activeMenu === "UserProfile" ? "active nav_content" : "nav_content"
          }
          onClick={() => {
            handleMenuClick("UserProfile");
          }}
          data-tooltip="Profile"
        >
          <BsPersonFill />
        </div>
        <div
          className={
            activeMenu === "UserCertificates"
              ? "active nav_content"
              : "nav_content"
          }
          onClick={() => {
            handleMenuClick("UserCertificates");
          }}
          data-tooltip="Certificates"
        >
          <TbCertificate />
        </div>
        <div
          className={
            activeMenu === "ApprovedCertificate"
              ? "active nav_content"
              : "nav_content"
          }
          onClick={() => {
            handleMenuClick("ApprovedCertificate");
          }}
          data-tooltip="Approved Certificate"
        >
          <FcApproval />
        </div>
        <div
          className={
            activeMenu === "PendingApproval"
              ? "active nav_content"
              : "nav_content"
          }
          onClick={() => {
            handleMenuClick("PendingApproval");
          }}
          data-tooltip="Pending Approval"
        >
          <FcClock />
        </div>
        <div
          className={
            activeMenu === "About"
              ? "active about-section nav_content"
              : "about-section nav_content"
          }
          onClick={() => {
            handleMenuClick("About");
          }}
          data-tooltip="About"
        >
          <FcAbout />
        </div>
        <button onClick={handleLogOut} className="log_out">
          Log out
        </button>
      </div>
    </nav>
  );
}
