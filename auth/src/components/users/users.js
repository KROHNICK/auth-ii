import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers } from "../../actions";
import User from "./user";
import styled from "styled-components";
import { Button } from "reactstrap";

const UserList = styled.div`
  width: 880px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Div = styled.div`
  width: 880px;
  margin: 150px auto;
  display: flex;
  justify-content: space-around;
`;

class Users extends Component {
  componentDidMount() {
    this.getAll();
  }

  //   componentDidUpdate() {
  //     this.getAll();
  //   }

  getAll = () => {
    const headersObj = {
      headers: { authorization: this.props.token }
    };
    this.props.getUsers(headersObj);
    console.log(headersObj);
  };

  toRegister = () => {
    this.props.history.push("/register");
  };

  toLogin = () => {
    this.props.history.push("/login");
  };

  logOut = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <Div>
        {!this.props.token ? (
          <div>
            <div>
              <h3>Sorry, you do not have access to users</h3>
              <h4>Please log in or register.</h4>
            </div>
            <Buttons>
              <Button onClick={this.toRegister}>Register</Button>
              <Button onClick={this.toLogin}>Login</Button>
            </Buttons>
          </div>
        ) : (
          <UserList>
            <div>
              <Button onClick={this.logOut}>Log Out</Button>
            </div>

            {this.props.users ? (
              this.props.users.map(users => {
                return <User users={users} />;
              })
            ) : (
              <h4>No Users :(</h4>
            )}
          </UserList>
        )}
      </Div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    users: state.users,
    token: state.token,
    isLoggedIn: state.isLoggedIn
  };
};

export default connect(
  mapStateToProps,
  { getUsers }
)(Users);
