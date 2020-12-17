import React, { useState } from "react";
import Login from "./components/Login/LoginForm";
import Registration from "./components/Login/RegistrationForm";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PublicRoute from "./PublicRoute";
import AppRouter from "./AppRouter";

function App() {
  // const [loggedInUser, setLoggedInUser] = useState({});
  const user = JSON.parse(localStorage.getItem("user")) || "";
  // console.log(user);
  const [authenticated, setAuthenticated] = useState(user || "");

  // console.log("loggedInUser");
  return (
    <>
      <Router>
        <Switch>
          <PublicRoute
            path="/"
            exact
            render={(props) => (
              <Login {...props} authenticated={authenticated} />
            )}
          />
          <PublicRoute
            path="/register"
            exact
            render={(props) => (
              <Registration {...props} authenticated={authenticated} />
            )}
          />
          <Route
            path={["/users/*", "/user/*"]}
            render={(props) => {
              return <AppRouter {...props} />;
            }}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
