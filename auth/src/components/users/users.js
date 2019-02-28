import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers } from "../../actions";
import User from "./user";
import styled from "styled-components";
import { Button } from "reactstrap";
import axios from "axios";

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

class Users extends Component {
  componentDidMount() {
    const endpoint = "http://localhost:3000/api/users";
    const token = localStorage.getItem("jwt");
    const reqOptions = {
      headers: {
        authorization: token
      }
    };
    axios
      .get(endpoint)
      .then(res => {
        this.setState({
          users: res.data.users
        });
      })
      .catch(err => console.log(err));
  }

  state = {
    users: []
  };

  //   getAll = () => {
  //     const headersObj = {
  //       headers: { authorization: this.props.token }
  //     };
  //     this.props.getUsers(headersObj);
  //     console.log(headersObj);
  //   };

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
    console.log(this.state);
    return (
      <Div>
        <div>
          <Button onClick={this.logOut}>Log Out</Button>
        </div>

        <UserList>
          <List>
            {this.state.users ? (
              this.state.users.map(users => {
                return (
                  <Item key={users.id}>
                    <User users={users} />
                  </Item>
                );
              })
            ) : (
              <h4>No Users :(</h4>
            )}
          </List>
        </UserList>
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
