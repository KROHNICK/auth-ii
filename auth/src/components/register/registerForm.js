import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

const RegisterForm = props => {
  return (
    <Form onSubmit={props.postAuthReg}>
      <h1>Register Page</h1>
      <div className="username">
        <Label>Username</Label>
        <Input
          type="text"
          name="username"
          value={props.username}
          placeholder="Username"
          onChange={props.handleChanges}
          required
        />
      </div>
      <div className="password">
        <Label>Password</Label>
        <Input
          type="text"
          name="password"
          value={props.password}
          placeholder="Password"
          onChange={props.handleChanges}
          required
        />
      </div>
      <div className="department">
        <Label>Department</Label>
        <Input
          type="text"
          name="department"
          value={props.department}
          placeholder="Department"
          onChange={props.handleChanges}
          required
        />
      </div>
      <Button onClick={props.handleSubmit}>Register</Button>
    </Form>
  );
};

export default RegisterForm;
