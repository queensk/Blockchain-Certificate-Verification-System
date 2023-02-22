import React from "react";
import User from "./User";

export default function UserProfile() {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    image:
      "https://dl.dropboxusercontent.com/s/yyd1fcw7dvtfa1q/avatar-colored.jpg",
    phoneNumber: "+254795062996",
  };

  return (
    <div className="user-profile-container">
      <User {...user} />
    </div>
  );
}
