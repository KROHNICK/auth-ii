import React, { Component } from "react";
import { Button } from "reactstrap";
import styled from "styled-components";

const Div = styled.div`
  width: 880px;
  margin: 150px auto;
  display: flex;
  justify-content: space-around;
`;

class Home extends Component {
  toRegister = () => {
    this.props.history.push("/register");
  };

  toLogin = () => {
    this.props.history.push("/login");
  };

  toUsers = () => {
    this.props.history.push("/users");
  };

  render() {
    return (
      <Div>
        <Button onClick={this.toRegister}>Register</Button>
        <Button onClick={this.toUsers}>Users</Button>
        <Button onClick={this.toLogin}>Log In</Button>
      </Div>
    );
  }
}

export default Home;
