import React, { Component } from "react";
import { Button } from "reactstrap";

class Home extends Component {
  toRegister = () => {
    this.props.history.push("/register");
  };

  toLogin = () => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <div>
        <Button onClick={this.toRegister}>Register</Button>
        <Button onClick={this.toLogin}>Log In</Button>
      </div>
    );
  }
}

export default Home;
