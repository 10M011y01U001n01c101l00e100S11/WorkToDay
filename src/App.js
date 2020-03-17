import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./components/Home";
import Users from "./components/Users";
import Login from "./components/Login";
import AddUsers from "./components/AddUsers";
import ProminentAppBar from "./components/ProminentAppBar";

export default function App() {

  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/users">
            <ProminentAppBar />
            <Users />
          </Route>
          <Route path="/addusers">
            <ProminentAppBar />
            <AddUsers />
          </Route>
          <Route path="/">
            <ProminentAppBar />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
