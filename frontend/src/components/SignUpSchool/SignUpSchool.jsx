import React, { useState } from "react";
import TextInput from "../TextInput/TextInput";
import api from "../../api/api.jsx";
import MessagePopUp from "../MessagePopUp/MessagePopUp";

export default function SignUpSchool({ setShowSignUp }) {
  const [schoolName, setSchoolName] = useState("");
  const [schoolLocation, setSchoolLocation] = useState("");
  const [schoolEmail, setSchoolEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [signUpMessage, setSignUpMessage] = useState("");

  const data = {
    email: schoolEmail,
    password: userPassword,
    school_name: schoolName,
    school_location: schoolLocation,
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!schoolName || !schoolLocation || !schoolEmail || !userPassword) {
      setSignUpMessage("Please fill out all fields.");
      return;
    }
    api
      .post("/schools", data)
      .then((response) => {
        if (response.status === 201) {
          setSignUpMessage(`Successfully SignUp ${response.data.email}`);
          setUserPassword("");
          setSchoolEmail("");
          setSchoolLocation("");
          setSchoolName("");
          setShowSignUp(true);
        }
      })
      .catch((error) => {
        if (error.request.status === 500) {
          setSignUpMessage(`Error occurred while connecting to the server`);
        } else {
          setSignUpMessage(`Ensure you input correct details`);
        }
      });
  };
  return (
    <>
      {signUpMessage && (
        <MessagePopUp message={signUpMessage} setMessage={setSignUpMessage} />
      )}
      <form onClick={(e) => e.preventDefault}>
        <div>
          <h1>Sign Up</h1>
        </div>
        <TextInput
          label="School Name"
          type="text"
          name="name"
          placeholder="School Name"
          value={schoolName}
          setValue={setSchoolName}
        />
        <TextInput
          label="School Location"
          type="text"
          name="name"
          placeholder="School Location"
          value={schoolLocation}
          setValue={setSchoolLocation}
        />
        <TextInput
          label="school email"
          type="school email"
          name="school email"
          placeholder="school Email"
          value={schoolEmail}
          setValue={setSchoolEmail}
        />
        <TextInput
          label="password"
          type="password"
          name="password"
          placeholder="********"
          value={userPassword}
          setValue={setUserPassword}
        />
        <button className="btn_login button-block" onClick={handleFormSubmit}>
          Sign Up
        </button>
      </form>
    </>
  );
}
