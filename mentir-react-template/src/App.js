import logo from "./logo.svg";
import "./App.css";

import React from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./containers/Dashboard";
import Home from "./containers/Home";
import Admin from "./containers/Admin";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/admin/">
          <Admin />
        </Route>
        <Route path="/dashboard" component={Dashboard} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
