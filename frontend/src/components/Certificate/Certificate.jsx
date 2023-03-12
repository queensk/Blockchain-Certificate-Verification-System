import React from "react";
import "./Certificate.css";

const Certificate = ({
  student_name,
  student_email,
  school_name,
  school_major,
  school_department,
  school_location,
}) => {
  return (
    <div className="certificate">
      <div className="header">
        <h1>Certificate of Completion</h1>
      </div>
      <div className="content">
        <p>This certificate is presented to</p>
        <h2>{student_name}</h2>
        <p>for successfully completing the following course:</p>
        <h3>{school_name}</h3>
        <p>
          with a major in {school_major} and a concentration in{" "}
          {school_department}.
        </p>
        <p>Completed at {school_location}.</p>
        <p>Date of completion: {new Date().toLocaleDateString()}</p>
      </div>
      <div className="footer">
        <p>This certificate is issued by Example University.</p>
      </div>
    </div>
  );
};

export default Certificate;
