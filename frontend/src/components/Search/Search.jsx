import React, { useState, useEffect } from "react";
import "./Search.css";
import { FcLibrary, FcGlobe } from "react-icons/fc";

const Search = ({ data, setSchoolSearchInputData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [displaySearch, setDisplaySearch] = useState(true);

  useEffect(() => {
    const results = data?.filter((item) =>
      item.school_name?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, data]);

  const handleSearchFromFill = (item) => {
    setSchoolSearchInputData(item);
    setDisplaySearch(false);
  };
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setDisplaySearch(true);
        }}
      />
      {searchResults?.length <= 0 && searchTerm && (
        <div className="no-results search-results">No data found.</div>
      )}
      {searchResults?.length > 0 && searchTerm !== "" && displaySearch && (
        <div className="search-results">
          {searchResults?.map((item, index) => (
            <div key={index} className="search-data-results">
              <span>
                <span className="searchIcons">
                  <FcLibrary />
                </span>
                {item.school_name}
              </span>
              <span>
                <span className="searchIcons">
                  <FcGlobe />
                </span>
                {item.school_location}
              </span>
              <button
                onClick={() => handleSearchFromFill(item)}
                className="searchDataButton"
              >
                Add school
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
