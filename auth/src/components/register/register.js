import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "../../actions";
import RegisterForm from "./registerForm";
import { Button } from "reactstrap";

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
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      password: this.state.password,
      department: this.state.department
    };
    console.log(newUser);
    this.props.register(newUser);
    this.setState({
      username: "",
      password: "",
      department: ""
    });
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
        {!this.props.isNotRegistered ? null : <h3>Could not register.</h3>}
        {!this.props.isRegistered ? null : this.props.history.push("/users")}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isNotRegistered: state.isNotRegistered,
    isRegistered: state.isRegistered
  };
};

export default connect(
  mapStateToProps,
  { register }
)(Register);
