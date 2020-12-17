import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Feeds from "./Feed";
import Friends from "./Friends";
import headers from "../auth/headers";
import FriendsSuggestion from "./FriendsSuggestion";
import io from "socket.io-client";

const TimeLine = ({ logOut }) => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await fetch("/user-details", {
          mode: "cors",
          headers: headers(),
        });
        const res = await response.json();
        // console.log(res);
        setUserDetails(res.data || {});
      } catch (err) {
        console.log(err);
      }
    };
    getUserInfo();
  }, [userDetails._id]);

  const socket = io.connect("", {
    transports: ["websocket", "polling", "flashsocket"],
  });

  useEffect(() => {
    console.log(userDetails._id, "userDetails");
    socket.emit("connection", userDetails._id);
    return () => {};
  }, [userDetails._id, socket]);

  //   console.log(userDetails);
  return (
    <>
      <div
        className="container-fuild pt-4 "
        style={{ backgroundColor: "#eff2f5" }}
      >
        <div className="row">
          <div className="col-sm-3 d-none d-sm-none d-md-none d-lg-none d-xl-block">
            <Sidebar />
          </div>
          <div className="col-xs-8 col-sm-12 col-md-7 col-lg-7 col-xl-6  ">
            <Feeds currentUser={userDetails} socket={socket} />
          </div>
          <div className="col-sm-4 col-md-5 col-lg-5 col-xl-3 d-none d-sm-none d-md-block ">
            <FriendsSuggestion currentUser={userDetails} />
            <Friends friends={userDetails.friends} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeLine;
