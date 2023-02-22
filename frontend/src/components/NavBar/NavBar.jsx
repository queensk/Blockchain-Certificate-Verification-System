import React from "react";
import logo from "./Logo.svg";
import "./NavBar.css";
import { TbCertificate } from "react-icons/tb";
import { FcAbout, FcApproval, FcClock } from "react-icons/fc";
import { BsPersonFill } from "react-icons/bs";

export default function NavBar({ handleMenuClick, activeMenu }) {
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
        <div className="nav_content" data-tooltip="Pending Approval">
          <FcClock />
        </div>
        <div className="about-section nav_content" data-tooltip="About">
          <FcAbout />
        </div>
        <button className="log_out">Log out</button>
      </div>
    </nav>
  );
}
