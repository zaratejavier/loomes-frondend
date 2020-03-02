import React, { useState } from "react";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./Signup.css";

export default function Signup(props) {
  const [fields, handleFieldChange] = useFormFields({
    username: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      // const newUser = await Auth.signUp({
      //   username: fields.email,
      //   password: fields.password
      // });
      // const newUser = {};

      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      const raw = JSON.stringify({ 
        "username": fields.username,
        "first_name": fields.first_name,
        "last_name": fields.last_name,
        "phone_number": fields.phone_number,
        "email": fields.email,
        "password": fields.password,
      });

      const requestOptions = {
        method: 'POST',
        headers: headers,
        body: raw,
        redirect: 'follow'
      };

      const base_url = "https://floating-reaches-62304.herokuapp.com/"
      const response = await fetch(`${base_url}/api/users`, requestOptions)

      setIsLoading(false);
      // setNewUser(newUser);
      console.log(response);
      // props.history.push("/");
      // alert('User has been successfully created!');
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      // props.history.push("/");
      // console.log(raw);
      // alert('User has been successfully created!');
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }



  function renderConfirmationForm() {
    return (
      <form onSubmit={handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            onChange={handleFieldChange}
            value={fields.confirmationCode}
          />
          <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateConfirmationForm()}
        >
          Verify
        </LoaderButton>
      </form>
    );
  }




  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="username" bsSize="large">
          <ControlLabel>Username</ControlLabel>
          <FormControl
            autoFocus
            type="username"
            value={fields.username}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="first_name" bsSize="large">
          <ControlLabel>First Name</ControlLabel>
          <FormControl
            type="first_name"
            value={fields.first_name}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="last_name" bsSize="large">
          <ControlLabel>Last Name</ControlLabel>
          <FormControl
            type="last_name"
            onChange={handleFieldChange}
            value={fields.last_name}
          />
        </FormGroup>
        <FormGroup controlId="phone_number" bsSize="large">
          <ControlLabel>Phone Number</ControlLabel>
          <FormControl
            type="phone_number"
            onChange={handleFieldChange}
            value={fields.phone_number}
          />
        </FormGroup>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="email"
            onChange={handleFieldChange}
            value={fields.email}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            onChange={handleFieldChange}
            value={fields.password}
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            type="confirmPassword"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create User
        </LoaderButton>
      </form>
    );
  }

  return (
    <div className="Signup">
      {console.log(newUser)}
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
}