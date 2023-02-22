import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import { UserProfile } from "../../components/UserProfile";
import "./UserPage.css";

export default function UserPage() {
  return (
    <div className="user-data">
      <NavBar />
      <div className="User-Main-content">
        <UserProfile />
      </div>
    </div>
  );
}
