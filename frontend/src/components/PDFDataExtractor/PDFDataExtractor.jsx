import { useState, useEffect, useContext } from "react";
import api from "../../api/api";
import { AuthContext } from "../../CustomHooks/Context/AuthProvider";
import Search from "../Search/Search";
import MessagePopUp from "../MessagePopUp/MessagePopUp";

function PDFDataExtractor({ pdfData, setCertificateUploadData }) {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [school, setSchool] = useState("");
  const [schoolMajor, setSchoolMajor] = useState("");
  const [schoolDepartment, setSchoolDepartment] = useState("");
  const [schoolLocation, setSchoolLocation] = useState("");
  const [certificateIssuerDate, setCertificateIssuerDate] = useState("");
  const { userId, userRole } = useContext(AuthContext);
  const [schoolSearchData, setSchoolSearchData] = useState(null);
  const [schoolSearchInputData, setSchoolSearchInputData] = useState(null);
  const [signUpMessage, setSignUpMessage] = useState("");

  const data = {
    student_name: name,
    student_email: email,
    school_name: school,
    school_major: schoolMajor,
    school_department: schoolDepartment,
    school_location: schoolLocation,
    school_id: schoolId,
    completion_data: certificateIssuerDate,
  };

  useEffect(() => {
    setName(pdfData.name);
    setEmail(pdfData.email);
    setSchoolId(
      schoolSearchInputData ? schoolSearchInputData?.id : pdfData.school_id
    );
    setSchool(
      schoolSearchInputData
        ? schoolSearchInputData?.school_name
        : pdfData.school
    );
    setSchoolMajor(pdfData.school_major);
    setSchoolDepartment(pdfData.school_department);
    setSchoolLocation(
      schoolSearchInputData
        ? schoolSearchInputData.school_location
        : pdfData.school_location
    );
    handleSchoolData();
  }, [pdfData, schoolSearchInputData]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSchoolIdChange = (event) => {
    if (userRole === "school") {
      setSchoolId(userId);
    } else {
      setSchoolId(event.target.value);
    }
  };

  const handleSchoolChange = (event) => {
    setSchool(event.target.value);
  };

  const handleSchoolMajorChange = (event) => {
    setSchoolMajor(event.target.value);
  };

  const handleSchoolDepartmentChange = (event) => {
    setSchoolDepartment(event.target.value);
  };

  const handleSchoolLocationChange = (event) => {
    setSchoolLocation(event.target.value);
  };
  const handleCertificateIssuerDate = (event) => {
    setCertificateIssuerDate(event.target.value);
  };
  const handleSchoolData = () => {
    api
      .get("/schools")
      .then((results) => {
        setSchoolSearchData(results.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCertificateSubmit = () => {
    if (
      !data.student_name ||
      !data.student_email ||
      !data.school_name ||
      !data.school_major ||
      !data.school_department ||
      !data.school_location ||
      !data.school_id ||
      !data.completion_data
    ) {
      setSignUpMessage("Please fill out all fields.");
      return;
    }
    if (userRole === "school") {
      api
        .post(`/users/${studentId}/certificates`, data)
        .then((response) => {
          setCertificateUploadData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      api
        .post(`/users/${userId}/certificates`, data)
        .then((response) => {
          setCertificateUploadData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      {signUpMessage && (
        <MessagePopUp message={signUpMessage} setMessage={setSignUpMessage} />
      )}
      <div className="certificate-user-data">
        <div className="certificate-user-data-head">
          <h3>EXTRACTED DATA FROM PDF DATA</h3>
          <p>
            You can edit the data extracted from pdf. If you don't have a PDF
            ender the data of your certificate in the input section.
          </p>
          <h3 className="school-search">search for school by name</h3>
        </div>
        <Search
          data={schoolSearchData}
          setSchoolSearchInputData={setSchoolSearchInputData}
          setName={setName}
          setEmail={setEmail}
          setStudentId={setStudentId}
        />
        <div className="certificate-input">
          <label>
            Name
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
          <label>
            Email
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>
          <label>
            School ID
            <input
              type="text"
              value={schoolId}
              onChange={handleSchoolIdChange}
            />
          </label>
          <label>
            School
            <input type="text" value={school} onChange={handleSchoolChange} />
          </label>
          <label>
            School Major
            <input
              type="text"
              value={schoolMajor}
              onChange={handleSchoolMajorChange}
            />
          </label>
          <label>
            certificate Issuer Date
            <input
              type="date"
              value={certificateIssuerDate}
              onChange={handleCertificateIssuerDate}
            />
          </label>
          <label>
            School Department
            <input
              type="text"
              value={schoolDepartment}
              onChange={handleSchoolDepartmentChange}
            />
          </label>
          <label>
            School Location
            <input
              type="text"
              value={schoolLocation}
              onChange={handleSchoolLocationChange}
            />
          </label>
        </div>
        <button type="submit" onClick={() => handleCertificateSubmit()}>
          Add certificate
        </button>
      </div>
    </>
  );
}

export default PDFDataExtractor;
