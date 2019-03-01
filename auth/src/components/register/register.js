import React, { Component } from "react";
import RegisterForm from "./registerForm";
import { Button } from "reactstrap";
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

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      department: ""
    };
  }

  handleChanges = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const endpoint = "http://localhost:3000/api/auth/register";

    axios
      .post(endpoint, this.state)
      .then(res => {
        localStorage.setItem("jwt", res.data.token);
        this.props.history.push("/users");
      })
      .catch(err => console.log(err));
  };

  toLogin = () => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <Div>
        <RegisterForm
          handleChanges={this.handleChanges}
          handleSubmit={this.handleSubmit}
          username={this.state.username}
          password={this.state.password}
          department={this.state.department}
        />
        <Buttons>
          <Button onClick={this.handleSubmit}>Register</Button>

          <Button onClick={this.toLogin}>Log In</Button>
        </Buttons>
      </Div>
    );
  }
}

export default Register;
