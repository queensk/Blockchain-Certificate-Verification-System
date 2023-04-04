import React, { useEffect, useState } from "react";
import api from "../../api/api.jsx";
import School from "./School";
import ErrorPopUp from "../MessagePopUp/MessagePopUp";
import AboutObject from "../AboutObject/AboutObject.jsx";

export default function SchoolProfile({ userId }) {
  const [error, setError] = useState(false);
  const [user, setUserData] = useState({});
  // const [aboutContent, setAboutContent] = useState(user.about_profile);
  // console.log(user.about_profile);
  useEffect(() => {
    api
      .get(`/schools/${userId}`)
      .then((response) => {
        setUserData(response.data);
        // setAboutContent(response.data.about_profile);
      })
      .catch((error) => {
        setError("An error occurred while connecting to the server!");
      });
  }, [userId]);

  const handleSaveAbout = () => {
    const data = {
      about_profile: user.about_profile,
    };
    api
      .put(`/schools/${userId}`, data)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError("An error occurred while connecting to the server!");
      });
  };
  return (
    <>
      {error && <ErrorPopUp message={error} setMessage={setError} />}
      <div className="user-profile-container">
        <School {...user} setUserData={setUserData} />
      </div>
      <AboutObject
        // aboutContent={aboutContent}
        // setAboutContent={setAboutContent}
        user={user}
        setUserData={setUserData}
        handleSaveAbout={handleSaveAbout}
      />
    </>
  );
}
