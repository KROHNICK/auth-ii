import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "reactstrap";
import axios from "axios";
import Authenticate from "../auth/auth";

const Div = styled.div`
  width: 880px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const List = styled.div`
  margin: 50px 0;
`;

class Users extends Component {
  state = {
    users: []
  };

  logOut = () => {
    localStorage.removeItem("jwt");
    console.log(localStorage);
    this.props.history.push("/login");
  };

  render() {
    return (
      <Div>
        <Button onClick={this.logOut}>Log Out</Button>
        <List>
          <h2>List of Users</h2>
          <ul>
            {this.state.users.map(u => (
              <li key={u.id}>{u.username}</li>
            ))}
          </ul>
        </List>
      </Div>
    );
  }

  componentDidMount() {
    axios.get("/users").then(res => {
      this.setState({ users: res.data.users });
    });
  }
}

export default Authenticate(Users);
