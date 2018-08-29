import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { HashRouter } from "react-router-dom";
import router from "./router";
import Nav from "./components/Nav/Nav";
import { withRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.location.pathname !== "/" && <Nav />}
        {router}
      </div>
    );
  }
}

export default withRouter(App);
