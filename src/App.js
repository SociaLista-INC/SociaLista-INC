import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { HashRouter } from "react-router-dom";
import router from "./router";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">{router}</div>
      </HashRouter>
    );
  }
}

export default App;
