import React, { Component } from "react";
import { login } from "../../actions";
import { connect } from "react-redux";
import LoginForm from "./loginForm";
import { Button } from "reactstrap";

class Login extends Component {
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
    const creds = {
      username: this.state.username,
      password: this.state.password
    };
    console.log(creds);
    this.props.login(creds);
    this.setState({
      username: "",
      password: ""
    });
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
          toHome={this.toHome}
        />
        <Button onClick={this.toRegister}>Register</Button>
        {!this.props.isNotLoggedIn ? null : <h3>Could not login.</h3>}
        {!this.props.isLoggedIn ? null : this.props.history.push("/users")}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    isNotLoggedIn: state.isNotLoggedIn,
    isLoggedIn: state.isLoggedIn
  };
};

export default connect(
  mapStateToProps,
  { login }
)(Login);
