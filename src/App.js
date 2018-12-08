import React, { Component } from "react";
import "./App.css";

import Accordion from "./Components/Accordion";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
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
          search: "hdfc",
          rows: 2,
          offset: 1
        })
      }
    )
      .then(res => res.json())
      .then(res => this.setState({ data: res.data.search_results }));
  }

  render() {
    return (
      <div className="App">
        <Accordion>
          {this.state.data.map((item, i) => (
            <div key={i}>
              <Accordion.Tab itemId={i}>{item.name}</Accordion.Tab>
              <Accordion.Pane itemId={i}>{item.riskometer}</Accordion.Pane>
            </div>
          ))}
        </Accordion>
      </div>
    );
  }
}

export default App;
