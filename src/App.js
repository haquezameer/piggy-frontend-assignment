import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    fetch('https://cors-anywhere.herokuapp.com/https://api.piggy.co.in/v2/mf/search/',{
      method: 'post',
      headers: {
        "authorization": "Token a41d2b39e3b47412504509bb5a1b66498fb1f43a",
        "cache-control": "no-cache",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        "search": "hdfc",
        "rows": 2,
	      "offset": 1
      })
    })
    .then(res => res.json())
    .then(res => console.log(res))
  }

  render() {
    return (
      <div className="App">
        hello world
      </div>
    );
  }
}

export default App;
