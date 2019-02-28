import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers } from "../../actions";
import User from "./user";
import styled from "styled-components";
import { Button } from "reactstrap";
import axios from "axios";
import Authenticate from "../auth/auth";

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
  flex-direction: column;
`;

const Item = styled.li`
  display: flex;
  flex-direction: row;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

class Users extends React.Component {
  state = {
    users: []
  };

  render() {
    return (
      <>
        <Button>Log Out</Button>
        <h2>List of Users</h2>
        <ul>
          {this.state.users.map(u => (
            <li key={u.id}>{u.username}</li>
          ))}
        </ul>
      </>
    );
  }

  componentDidMount() {
    axios.get("/users").then(res => {
      this.setState({ users: res.data.users });
    });
  }
}

export default Authenticate(Users);
