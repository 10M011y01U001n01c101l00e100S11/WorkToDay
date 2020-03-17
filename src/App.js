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
import AddUsersAppBar from "./components/AddUsersAppBar";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CheckHistory from "./components/CheckHistory";

const theme = createMuiTheme({

  palette: {
    primary: {
      main: '#1976d2',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: "Prompt"
  }
});

export default function App() {

  return (
    <Router>
      <ThemeProvider theme={theme}>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/users">
            {localStorage.getItem('login_role') === 'admin' ? <ProminentAppBar appBar={'ระบบแสดงข้อมูลผู้ใช้งาน'} /> : <AddUsersAppBar appBar={'ระบบแสดงข้อมูลผู้ใช้งาน'} />}
            <Users />
          </Route>
          <Route path="/addusers">
            {localStorage.getItem('login_role') === 'admin' ? <ProminentAppBar appBar={'ระบบเพิ่มข้อมูลผู้ใช้งาน'} /> : <AddUsersAppBar appBar={'ระบบเพิ่มข้อมูลผู้ใช้งาน'} />}
            <AddUsers />
          </Route>

          <Route path="/checkhistory">
            {localStorage.getItem('login_role') === 'admin' ? <ProminentAppBar appBar={'ระบบแสดงประวัติการเข้าออกงาน'} /> : <AddUsersAppBar appBar={'ระบบแสดงประวัติการเข้าออกงาน'} />}
            <CheckHistory />
          </Route>

          <Route path="/">
            {localStorage.getItem('login_role') === 'admin' ? <ProminentAppBar appBar={'ระบบบันทึกการเข้าออกงาน'} /> : <AddUsersAppBar appBar={'ระบบบันทึกการเข้าออกงาน'} />}
            <Home />
          </Route>

        </Switch>
      </ThemeProvider>
    </Router>
  );
}
