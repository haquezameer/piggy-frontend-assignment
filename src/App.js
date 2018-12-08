import React, { Component } from "react";
import { BounceLoader } from "react-spinners";

import Accordion from "./Components/Accordion/Accordion";
import SearchBar from "./Components/SearchBar/SearchBar";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchString: "",
      loading: false
    };
  }

  fetchSearchResults = () => {
    fetch(
      "https://cors-anywhere.herokuapp.com/https://api.piggy.co.in/v2/mf/search/",
      {
        method: "post",
        headers: {
          authorization: "Token a41d2b39e3b47412504509bb5a1b66498fb1f43a",
          "cache-control": "no-cache",
          "content-type": "application/json"
        },
        body: JSON.stringify({
          search: `${this.state.searchString}`,
          rows: 2,
          offset: 1
        })
      }
    )
      .then(res => res.json())
      .then(res =>
        this.setState({ loading: false, data: res.data.search_results })
      );
  };

  handleChange = e => {
    console.log(e.target.value);
    this.setState({ searchString: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchString.length > 0)
      this.setState({ loading: true }, () => {
        this.fetchSearchResults();
      });
  };

  render() {
    return (
      <div className="App">
        <SearchBar
          value={this.state.searchString}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
        <BounceLoader
          sizeUnit={"px"}
          size={150}
          color={"#123abc"}
          loading={this.state.loading}
        />
        {!this.state.loading ? (
          <Accordion>
            {this.state.data.map(item => (
              <div key={item.scheme_key}>
                <Accordion.Tab itemKey={item.scheme_key}>
                  {item.name}
                </Accordion.Tab>
                <Accordion.Pane itemKey={item.scheme_key} />
              </div>
            ))}
          </Accordion>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default App;
