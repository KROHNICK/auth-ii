import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Home from "./components/home/home";
import Register from "./components/register/register";
import Login from "./components/login/login";
import Users from "./components/users/users";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/users" component={Users} />
      </div>
    );
  }
}

export default withRouter(App);
