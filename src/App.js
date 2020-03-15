import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Users from "./components/Users";
import Login from "./components/Login";

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
          <Route path="/about">
            <Nav />
            <About />
          </Route>
          <Route path="/users">
            <Nav />
            <Users />
          </Route>
          <Route path="/">
            <Nav />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Nav() {
  return (

    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
    </nav>
  )
}