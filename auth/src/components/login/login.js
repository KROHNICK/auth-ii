import React, { Component } from "react";
import { login } from "../../actions";
import { connect } from "react-redux";
import LoginForm from "./loginForm";
import { Button } from "reactstrap";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChanges = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const endpoint = "http://localhost:3000/api/auth/login";

    axios
      .post(endpoint, this.state)
      .then(res => {
        localStorage.setItem("jwt", res.data.token);
        this.props.history.push("/users");
      })
      .catch(err => console.log(err));

    console.log(localStorage);
  };

  toRegister = () => {
    this.props.history.push("/register");
  };

  render() {
    return (
      <>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username" />
            <input
              name="username"
              id="username"
              value={this.state.username}
              onChange={this.handleChanges}
              type="text"
            />
          </div>
          <div>
            <label htmlFor="password" />
            <input
              name="password"
              id="password"
              value={this.state.password}
              onChange={this.handleChanges}
              type="password"
            />
          </div>

          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isNotLoggedIn: state.isNotLoggedIn,
    isLoggedIn: state.isLoggedIn
  };
};

export default connect(
  mapStateToProps,
  { login }
)(Login);
