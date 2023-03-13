import React, { useState, useEffect } from "react";
import "./AboutObject.css";

function AboutObject({ user, handleSaveAbout, setUserData }) {
  const [isEditable, setIsEditable] = useState(false);
  const handleInputChange = (event) => {
    setUserData({ ...setUserData, about_profile: event.target.value });
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSaveClick = () => {
    setIsEditable(false);
    handleSaveAbout();
  };

  return (
    <div className="about-container ">
      <h2>About Us</h2>
      <div className="about-content">
        {isEditable ? (
          <div>
            <textarea
              value={user.about_profile}
              onChange={handleInputChange}
              maxLength={650}
            />
            <button className="save-button" onClick={handleSaveClick}>
              Save
            </button>
          </div>
        ) : (
          <div>
            <p>{user.about_profile}</p>
            <button className="edit-button" onClick={handleEditClick}>
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AboutObject;
