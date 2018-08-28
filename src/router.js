import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./components/landing/landing";
import DashBoard from "./components/Dashboard/DashBoard";

export default (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/dashboard" component={DashBoard} />
  </Switch>
);
