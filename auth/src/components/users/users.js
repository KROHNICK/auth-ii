import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers } from "../../actions";
import User from "./user";
import styled from "styled-components";

const UserList = styled.div`
  width: 880px;
  margin: 100px auto;
  display: flex;
  flex-wrap: wrap;
`;

class Users extends Component {
  componentDidMount() {
    this.getAll();
  }

  getAll = () => {
    const headersObj = {
      headers: { authorization: this.props.token }
    };
    this.props.getUsers(headersObj);
    console.log(headersObj);
  };

  render() {
    console.log(this.props.users);
    return (
      <UserList>
        {this.props.users ? (
          this.props.users.map(users => {
            return <User users={users} />;
          })
        ) : (
          <h4>No Users :(</h4>
        )}
      </UserList>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    users: state.users,
    token: state.token
  };
};

export default connect(
  mapStateToProps,
  { getUsers }
)(Users);
