import React, { useState, useEffect } from "react";
import TimeLine from "./components/Timeline/Timeline";
import headers from "./components/auth/headers";
import PrivateRoute from "./PrivateRoute";
import Search from "./components/Search";
import UserPosts from "./components/UsersPost";
import Profile from "./components/Profile/Profile";
import FriendRequest from "./components/Timeline/FriendRequest";
import Header from "./components/Nav/Header";
import { Switch, useHistory } from "react-router-dom";

const AppRouter = (props) => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const user = JSON.parse(localStorage.getItem("user")) || "";

  const [authenticated, setAuthenticated] = useState(user || "");
  const userId = user ? user.user._id : "";
  const history = useHistory();

  const logOut = () => {
    localStorage.removeItem("user");
    setLoggedInUser({});
    setAuthenticated(false);
    history.push("/");
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await fetch(`/api/user-details`, {
          mode: "cors",
          headers: headers(),
        });
        const user = await response.json();
        setLoggedInUser(user.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (userId) {
      getUserInfo();
    }
  }, []);
  return (
    <>
      <Header currentUser={loggedInUser} logOut={logOut} />
      <Switch>
        <PrivateRoute
          exact
          path={"/users/:id/timeline"}
          render={(props) => <TimeLine {...props} logOut={logOut} />}
        />
        <PrivateRoute
          exact
          path={`/users/search`}
          render={(props) => (
            <Search {...props} currentUser={loggedInUser} logOut={logOut} />
          )}
        />
        <PrivateRoute
          exact
          path={`/user/posts/:id`}
          render={(props) => (
            <UserPosts {...props} currentUser={loggedInUser} logOut={logOut} />
          )}
        />
        <PrivateRoute
          exact
          path={`/user/profile`}
          render={(props) => (
            <Profile {...props} currentUser={loggedInUser} logOut={logOut} />
          )}
        />
        <PrivateRoute
          exact
          path={`/user/:id/requests`}
          render={(props) => (
            <FriendRequest
              {...props}
              currentUser={loggedInUser}
              logOut={logOut}
            />
          )}
        />
      </Switch>
    </>
  );
};

export default AppRouter;
