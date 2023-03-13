import React, { useEffect, useState } from "react";
import api from "../../api/api.jsx";
import User from "./User";
import ErrorPopUp from "../MessagePopUp/MessagePopUp";

export default function UserProfile({ userId }) {
  const [error, setError] = useState(false);
  const [user, setUserData] = useState({});

  useEffect(() => {
    api
      .get(`/users/${userId}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        setError("An error occurred while connecting to the server!");
      });
  }, [userId]);
  return (
    <>
      {error && <ErrorPopUp message={error} setMessage={setError} />}
      <div className="user-profile-container">
        <User {...user} setUserData={setUserData} />
      </div>
    </>
  );
}
