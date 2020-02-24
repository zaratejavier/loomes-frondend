import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./Login.css";
import { Link } from "react-router-dom";
import base64 from "base-64";

export default function Login(props) {
  let jwt = "";

  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    const headers = new Headers()
    headers.set('Authorization', 'Basic ' + base64.encode(fields.email + ":" + fields.password));
    const requestOptions ={
      method: 'POST',
      headers: headers
    };

    try {
      // const apiurl = "http://127.0.0.1:5000"
      const apiurl = "https://floating-reaches-62304.herokuapp.com/"
      fetch(`${apiurl}/api/tokens`, requestOptions).then(login_response => {
        login_response.json().then(response => {
          jwt = response.token
        });
      });
      
      props.userHasAuthenticated(true);
      props.history.push("/");
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="username"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </FormGroup>

        <Link to="/login/reset">Forgot password?</Link>


        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </form>
    </div>
  );
}