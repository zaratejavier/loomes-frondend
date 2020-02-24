import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./Login.css";
import { Link } from "react-router-dom";


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

    const requestOptions ={
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: fields.email,
        password: fields.password
      })
    };

    // fetch(`${config.apiurl}/users/authenticate`, requestOptions)
    //   .then(handleResponse)
    //   .then(user => {
    //     //login successful if there's a user in the response
    //     if(user){
    //       //store user details and basic auth credentials in local storage
    //       // to keep user logged in between page refreshes
    //       user..authdata = window.btoa(username + ':' + password);
    //       localStorage.setItem('user', JSON.stringify(user));
    //     }

    //     return user;
    //   })

    try {
      const apiurl = "https://floating-reaches-62304.herokuapp.com/"
      const response = fetch(`${apiurl}/api/tokens`, requestOptions)

      // const response = await axios.post(url,{crossdomain: true},{
      //   auth:{
      //    username: fields.email,
      //    password: fields.password
      //   }
      // });
      jwt = response.data.jwt;
      alert(jwt);
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