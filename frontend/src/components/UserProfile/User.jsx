import React, { useState, useRef } from "react";

export default function User({ name, email, image, phoneNumber }) {
  const [isEditing, setIsEditing] = useState(false);
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const phoneNumberInputRef = useRef(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const newName = nameInputRef.current.value;
    const newEmail = emailInputRef.current.value;
    const newNumber = phoneNumberInputRef.current.value;
    // Save the new data using a function passed as a prop from the parent component
    setIsEditing(false);
  };

  return (
    <div className="user-profile">
      <div className="user-profile-image">
        <img src={image} alt="Profile" />
      </div>
      <div className="user-profile-data">
        {isEditing ? (
          <>
            <input type="text" defaultValue={name} ref={nameInputRef} />
            <input type="text" defaultValue={email} ref={emailInputRef} />
            <input
              type="text"
              defaultValue={phoneNumber}
              ref={phoneNumberInputRef}
            />
          </>
        ) : (
          <>
            <h2>{name}</h2>
            <p>{email}</p>
            <p>{phoneNumber}</p>
          </>
        )}
        <div className="user-btn-container">
          {isEditing ? (
            <button className="user-profile-btn-edit" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button className="user-profile-btn-edit" onClick={handleEdit}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
