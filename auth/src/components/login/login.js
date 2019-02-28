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
      <div>
        <LoginForm
          handleChanges={this.handleChanges}
          handleSubmit={this.handleSubmit}
          username={this.state.username}
          password={this.state.password}
        />
        <Button onClick={this.toRegister}>Register</Button>
        {!this.props.isNotLoggedIn ? null : <h3>Could not login.</h3>}
        {!this.props.isLoggedIn ? null : this.props.history.push("/users")}
      </div>
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
