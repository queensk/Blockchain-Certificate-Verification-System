import React, { useState, useRef } from "react";
import storage from "../../config/firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ErrorPopUp from "../MessagePopUp/MessagePopUp";
import api from "../../api/api.jsx";
import Avatar from "@mui/material/Avatar";

export default function School({
  email,
  school_location,
  school_name,
  profile_url,
  phone_number,
  id,
  setUserData,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const schoolNameInputRef = useRef(null);
  const schoolLocationInputRef = useRef(null);
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
    const newSchoolName = schoolNameInputRef.current.value;
    const newSchoolLocation = schoolLocationInputRef.current.value;
    const newEmail = emailInputRef.current.value;
    const newNumber = phoneNumberInputRef.current.value;

    const data = {
      email: newEmail,
      school_name: newSchoolName,
      school_location: newSchoolLocation,
      phone_number: newNumber,
    };

    if (profileImg) {
      const profileImgRef = ref(
        storage,
        `schools/${school_name + "-" + id}/${id}`
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
        .put(`/schools/${id}`, data)
        .then((response) => {
          console.log(response);
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

              <label htmlFor="schoolName">School Name</label>
              <input
                id="schoolName"
                type="text"
                defaultValue={school_name}
                ref={schoolNameInputRef}
              />

              <label htmlFor="schoolLocation">School Location</label>
              <input
                id="schoolLocation"
                type="text"
                defaultValue={school_location}
                ref={schoolLocationInputRef}
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
              <h2>{`${school_name}`}</h2>
              <p>{`${school_location}`}</p>
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
