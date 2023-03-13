import { useState, useEffect } from "react";

function PDFDataExtractor({ pdfData }) {
  const [name, setName] = useState(pdfData.name);
  const [email, setEmail] = useState(pdfData.email);
  const [schoolId, setSchoolId] = useState(pdfData.school_id);
  const [school, setSchool] = useState(pdfData.school);
  const [schoolMajor, setSchoolMajor] = useState(pdfData.school_major);
  const [schoolDepartment, setSchoolDepartment] = useState(
    pdfData.school_department
  );
  const [schoolLocation, setSchoolLocation] = useState(pdfData.school_location);

  useEffect(() => {
    setName(pdfData.name);
    setEmail(pdfData.email);
    setSchoolId(pdfData.school_id);
    setSchool(pdfData.school);
    setSchoolMajor(pdfData.school_major);
    setSchoolDepartment(pdfData.school_department);
    setSchoolLocation(pdfData.school_location);
  }, [pdfData]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSchoolIdChange = (event) => {
    setSchoolId(event.target.value);
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

  return (
    <div className="certificate-user-data">
      <p>Edit data extracted from pdf</p>
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
          <input type="text" value={schoolId} onChange={handleSchoolIdChange} />
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
      <button type="submit">Add certificate</button>
      <button type="submit">Check certificate verification</button>
    </div>
  );
}

export default PDFDataExtractor;
