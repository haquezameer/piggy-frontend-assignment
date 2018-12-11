import React from "react";

import "./SearchBar.css";

const SearchBar = props => (
  <div className="searchbar">
    <form onSubmit={props.onSubmit} className="flex-form">
      <div style={{ width: "100%" }}>
        <input
          className="search-input"
          type="text"
          value={props.value}
          onChange={props.onChange}
          placeholder="Enter string to search (eg: hdfc, axis )..."
        />
      </div>
    </form>
  </div>
);

export default SearchBar;
