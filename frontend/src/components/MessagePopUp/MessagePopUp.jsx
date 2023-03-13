import React from "react";
import { BsXLg } from "react-icons/bs";
import "./MessagePopUp.css";

export default function ErrorPopUp({ message, setMessage }) {
  const handleClose = () => {
    setMessage("");
  };

  return (
    <div className="error-message">
      <p>{message}</p>
      <BsXLg onClick={handleClose} />
    </div>
  );
}
