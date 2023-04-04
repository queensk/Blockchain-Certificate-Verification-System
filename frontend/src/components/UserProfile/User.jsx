import React, { useState, useRef } from "react";
import storage from "../../config/firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ErrorPopUp from "../MessagePopUp/MessagePopUp";
import api from "../../api/api.jsx";
import Avatar from "@mui/material/Avatar";

export default function User({
  email,
  first_name,
  last_name,
  profile_url,
  phone_number,
  id,
  setUserData,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const firstNameInputRef = useRef(null);
  const lastNameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const phoneNumberInputRef = useRef(null);
  const [profileImg, setProfileImg] = useState(null);
  const [error, setError] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleProfileImgChange = (event) => {
    if (event.target.files[0]) {
      setProfileImg(event.target.files[0]);
    }
  };

  const handleSave = () => {
    const newFirstName = firstNameInputRef.current.value;
    const newLastName = lastNameInputRef.current.value;
    const newEmail = emailInputRef.current.value;
    const newNumber = phoneNumberInputRef.current.value;

    const data = {
      email: newEmail,
      first_name: newFirstName,
      last_name: newLastName,
      phone_number: newNumber,
    };

    if (profileImg) {
      const profileImgRef = ref(
        storage,
        `${first_name + last_name + "-" + id}/${id}`
      );
      uploadBytes(profileImgRef, profileImg)
        .then(() => {
          getDownloadURL(profileImgRef)
            .then((url) => {
              data.profile_url = url;
              api
                .put(`/users/${id}`, data)
                .then((response) => {
                  setUserData(response.data);
                  setIsEditing(false);
                })
                .catch((error) => {
                  setError("An error occurred while connecting to the server!");
                });
            })
            .catch((error) => {
              setError(
                "An error occurred while updating profile. Please try again."
              );
            });
        })
        .catch((error) => {
          setError(
            "An error occurred while updating profile. Please try again."
          );
        });
    } else {
      api
        .put(`/users/${id}`, data)
        .then((response) => {
          setUserData(response.data);
          setIsEditing(false);
        })
        .catch((error) => {
          setError("An error occurred while connecting to the server!");
        });
    }
  };

  return (
    <>
      {error && <ErrorPopUp message={error} setMessage={setError} />}
      <div className="user-profile">
        <div className="user-profile-image">
          <Avatar
            alt="Profile"
            src={profile_url}
            sx={{ width: 200, height: 200 }}
            style={{
              border: "2px solid red",
            }}
          />
        </div>
        <div className="user-profile-data">
          {isEditing ? (
            <>
              <label htmlFor="profileImg">Profile Image</label>
              <input
                id="profileImg"
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleProfileImgChange}
              />

              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                defaultValue={first_name}
                ref={firstNameInputRef}
              />

              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                type="text"
                defaultValue={last_name}
                ref={lastNameInputRef}
              />

              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                defaultValue={email}
                ref={emailInputRef}
              />

              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                id="phoneNumber"
                type="text"
                defaultValue={phone_number}
                ref={phoneNumberInputRef}
              />
            </>
          ) : (
            <>
              <h2>{`${first_name} ${last_name}`}</h2>
              <p>{email}</p>
              <p>{phone_number}</p>
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
    </>
  );
}
