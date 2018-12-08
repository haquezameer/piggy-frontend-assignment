import React from "react";

import "./SearchBar.css";

const SearchBar = props => (
  <form className="searchbar" onSubmit={props.onSubmit}>
    <input
      className="search-input"
      type="text"
      value={props.value}
      onChange={props.onChange}
    />
    <input type="submit" value="Submit" className="search-button" />
  </form>
);

export default SearchBar;
