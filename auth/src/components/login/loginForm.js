import React from "react";
import { Button, Form, Label, Input } from "reactstrap";

const LoginForm = props => {
  return (
    <Form onSubmit={props.postAuthReg}>
      <h1>Login Page</h1>
      <div className="username">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          name="username"
          value={props.username}
          placeholder="Username"
          onChange={props.handleChanges}
          required
        />
      </div>
      <div className="password">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="text"
          name="password"
          value={props.password}
          placeholder="Password"
          onChange={props.handleChanges}
          required
        />
      </div>
      <Button onClick={props.handleSubmit}>Log In</Button>
    </Form>
  );
};

export default LoginForm;
