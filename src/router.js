import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./components/landing/landing";
import DashBoard from "./components/Dashboard/DashBoard";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import Gallery from "./components/Gallery/Gallery";
import Trending from "./components/Trending/Trending";
// import Stories from "./components/Stories/Stories";
import Explore from "./components/Explore/Explore";

export default (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/dashboard" component={DashBoard} />
    <Route path="/profile/:auth_id" component={ProfilePage} />
    <Route path="/gallery" component={Gallery} />
    <Route path="/trending" component={Trending} />
    {/* <Route path="/stories" component={Stories} /> */}
    <Route path="/activity" component={Explore} />
  </Switch>
);
