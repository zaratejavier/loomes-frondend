import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import ResetPassword from "./containers/ResetPassword";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import NewNote from "./containers/NewNote";
import Notes from "./containers/Notes";
import Signup from "./containers/Signup";


export default function Routes({ appProps }) {
    return (
      <Switch>
        <AppliedRoute path="/" exact component={Home} appProps={appProps} />
        <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
        <AppliedRoute path="/signup" exact component={Signup} appProps={appProps} />
        <AppliedRoute path="/notes/new" exact component={NewNote} appProps={appProps} />
        <AppliedRoute path="/notes/:id" exact component={Notes} appProps={appProps} />
        
        <UnauthenticatedRoute
            path="/login/reset"
            exact
            component={ResetPassword}
            props={appProps}
        />
        { /* Finally, catch all unmatched routes */ }
        <Route component={NotFound} />

      </Switch>
    );
  }

  