import React from "react";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-component">
      <div className="footer-links">
        <span>Terms of Service</span>
        <span>Privacy Policy</span>
        <span>Accessibility</span>
      </div>
      <p>© {currentYear}, Inc.</p>
    </footer>
  );
}
