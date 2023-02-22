import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { UserProfile } from "../../components/UserProfile";
import "./UserPage.css";

export default function UserPage() {
  const [activeMenu, setActiveMenu] = useState("");

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div className="user-data">
      <NavBar handleMenuClick={handleMenuClick} activeMenu={activeMenu} />
      <div className="User-Main-content">
        {activeMenu === "UserProfile" && <UserProfile />}
      </div>
    </div>
  );
}
