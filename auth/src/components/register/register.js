import React, { Component } from "react";
import RegisterForm from "./registerForm";
import { Button } from "reactstrap";
import axios from "axios";

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
        console.log(res.data);
        this.props.history.push("/users");
      })
      .catch(err => console.log(err));
  };

  toLogin = () => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <div>
        <RegisterForm
          handleChanges={this.handleChanges}
          handleSubmit={this.handleSubmit}
          username={this.state.username}
          password={this.state.password}
          department={this.state.department}
        />
        <Button onClick={this.toLogin}>Log In</Button>
      </div>
    );
  }
}

export default Register;
