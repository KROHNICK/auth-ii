import React, { Component } from "react";
import styled from "styled-components";

const UserCard = styled.div`
  display: flex;
  flex-direction: column;
  border: solid 1px black;
  border-radius: 12px;
  width: 250px;
  height: 250px;
  margin: 15px;
`;

class User extends Component {
  render() {
    console.log(this.props);
    return (
      <UserCard>
        <p>{this.props.users.id}</p>
        <p>{this.props.users.username}</p>
        <p>{this.props.users.department}</p>
      </UserCard>
    );
  }
}

export default User;
