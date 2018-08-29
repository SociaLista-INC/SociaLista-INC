import React, { Component } from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import router from "./router";
import Nav from "./components/Nav/Nav";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          {router}
          {/* <Nav /> */}
        </div>
      </HashRouter>
    );
  }
}

export default App;
