import React, { Component } from "react";
import styled from "styled-components";

const UserCard = styled.div`
  display: flex;
  flex-direction: row;
  margin: 15px;
`;

class User extends Component {
  render() {
    return (
      <UserCard>
        <p>{this.props.users.username}</p>
      </UserCard>
    );
  }
}

export default User;
