import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Users from "./components/Users";
import Login from "./components/Login";
import AddUsers from "./components/AddUsers";

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
          <Route path="/addusers">
            <Nav />
            <AddUsers />
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

  const history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem('login_check')) {
        history.push('login')
    }
  })
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
        <li>
          <Link to="/addusers">AddUsers</Link>
        </li>
        <li>
          <Link to="/" onClick={() => localStorage.clear()}>Log Out</Link>
        </li>
      </ul>
    </nav>
  )
}