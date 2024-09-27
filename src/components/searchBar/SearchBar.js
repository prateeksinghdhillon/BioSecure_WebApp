import React from "react";
import "./SearchBar.css"; // Import the CSS file

function SearchBar({
  searchCriteria,
  setSearchCriteria,
  handleSearch,
  handleAddUser,
}) {
  const handleInputChange = (e) => {
    setSearchCriteria({
      ...searchCriteria,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="search-bar-container">
      <select
        name="filterBy"
        value={searchCriteria.filterBy}
        onChange={handleInputChange}
        className="filter-select"
      >
        <option value="">Select Filter</option>
        <option value="name">Name</option>
        <option value="id">ID</option>
        <option value="phnumber">Phone Number</option>
      </select>
      <input
        type="text"
        name="query"
        value={searchCriteria.query}
        onChange={handleInputChange}
        placeholder="Enter search term"
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>{" "}
      <button
        onClick={() => {
          handleAddUser("add");
        }}
        className="search-button"
      >
        Add
      </button>
    </div>
  );
}

export default SearchBar;
