import React, { Component } from "react";
import LoginForm from "./loginForm";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import axios from "axios";
import styled from "styled-components";

const Div = styled.div`
  width: 880px;
  margin: 0 auto;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 15px;
`;

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
  toLogin = () => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <Div>
        <h2>Login</h2>
        <Form onSubmit={this.handleSubmit}>
          <div>
            <Label htmlFor="username" />
            <Input
              name="username"
              id="username"
              value={this.state.username}
              onChange={this.handleChanges}
              type="text"
            />
          </div>
          <div>
            <Label htmlFor="password" />
            <Input
              name="password"
              id="password"
              value={this.state.password}
              onChange={this.handleChanges}
              type="password"
            />
          </div>

          <Buttons>
            <Button>Login</Button>
            <Button onClick={this.toRegister}>Register</Button>
          </Buttons>
        </Form>
      </Div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isNotLoggedIn: state.isNotLoggedIn,
    isLoggedIn: state.isLoggedIn
  };
};

export default Login;
