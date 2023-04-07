import React, { useState, useEffect, useContext, useRef } from "react";
import "./Search.css";
import { FcLibrary, FcGlobe, FcGraduationCap } from "react-icons/fc";
import { AuthContext } from "../../CustomHooks/Context/AuthProvider";
import api from "../../api/api";
import { MenuItemUnstyled } from "@mui/base";

const Search = ({
  data,
  setSchoolSearchInputData,
  setName,
  setEmail,
  setStudentId,
}) => {
  const [searchType, setSearchType] = useState("school");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { userRole } = useContext(AuthContext);
  const [userData, setSUserData] = useState([]);
  const searchRef = useRef(null);
  const [showSearch, setShowSearch] = useState(true);

  useEffect(() => {
    if (searchType === "school") {
      const results = data?.filter((item) =>
        item?.school_name?.toLowerCase().includes(searchTerm?.toLowerCase())
      );
      setSearchResults(results);
    } else if (searchType === "student") {
      handleUserData();

      const results = userData?.filter((item) => {
        const fullName = `${item?.first_name} ${item?.last_name}`;
        return fullName?.toLowerCase().includes(searchTerm?.toLowerCase());
      });
      setSearchResults(results);
    }
  }, [searchType, searchTerm, data]);

  const handleSearchFromFill = (searchType, item) => {
    if (searchType === "school") {
      setSchoolSearchInputData(item);
      console.log(item);
    } else {
      setName(`${item?.first_name} ${item?.last_name}`);
      setEmail(item?.email);
      setStudentId(item?.id);
    }
    searchRef.current.blur();
  };

  const handleUserData = () => {
    api
      .get("/users")
      .then((results) => {
        setSUserData(results.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDropdownSelect = (type) => {
    setSearchType(type);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowSearch(false);
    }, 500);
  };
  return (
    <div className="search-container">
      {userRole === "school" && (
        <select
          className="search-type-toggle"
          value={searchType}
          onChange={(e) => {
            handleDropdownSelect(e.target.value);
          }}
        >
          <option value="school">Schools</option>
          <option value="student">Students</option>
        </select>
      )}
      <input
        type="text"
        placeholder={`Search for ${
          searchType === "school" ? "schools" : "students"
        }...`}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        ref={searchRef}
        onBlur={handleBlur}
        onFocus={() => {
          setShowSearch(true);
        }}
      />
      {searchResults?.length <= 0 && searchTerm && showSearch && (
        <div className="no-results search-results">No data found.</div>
      )}
      {searchResults?.length > 0 && searchTerm !== "" && showSearch && (
        <div className="search-results">
          {searchResults?.map((item, index) => (
            <div key={index} className="search-data-results">
              <span>
                <span className="searchIcons">
                  {searchType === "school" ? (
                    <FcLibrary />
                  ) : (
                    <FcGraduationCap />
                  )}
                </span>
                {searchType === "school"
                  ? item.school_name
                  : `${item?.first_name} ${item?.last_name}`}
              </span>
              <span>
                <span className="searchIcons">
                  <FcGlobe />
                </span>
                {searchType === "school"
                  ? item.school_location
                  : item.student_location}
              </span>
              <button
                onClick={() => handleSearchFromFill(searchType, item)}
                className="searchDataButton"
              >
                {searchType === "school" ? "Add school" : "Add student"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
