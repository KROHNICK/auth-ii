import React, { Component } from "react";
import { Button } from "reactstrap";
import styled from "styled-components";

const Div = styled.div`
  width: 880px;
  margin: 50px auto;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 50px 0;
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
        <div>
          <h1>Welcome</h1>
        </div>
        <Buttons>
          <Button onClick={this.toRegister}>Register</Button>
          <Button onClick={this.toUsers}>Users</Button>
          <Button onClick={this.toLogin}>Log In</Button>
        </Buttons>
      </Div>
    );
  }
}

export default Home;
