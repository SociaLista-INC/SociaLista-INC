import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./components/landing/landing";
import DashBoard from "./components/Dashboard/DashBoard";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import Gallery from "./components/Gallery/Gallery";

export default (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/dashboard" component={DashBoard} />
    <Route path="/profile/:auth_id" component={ProfilePage} />
    <Route path="/gallery" component={Gallery} />
  </Switch>
);
