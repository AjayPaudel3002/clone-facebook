import React, { useState, useEffect } from "react";
import headers from "../auth/headers";
import FriendRequestList from "./FriendRequestList";

const FriendRequest = ({ currentUser, logOut }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const response = await fetch("/api/users/received-request", {
        headers: headers(),
      });
      const friendsList = await response.json();
      setFriends(friendsList.data);
    };
    if (currentUser._id) {
      getFriends();
    }
  }, [currentUser._id]);

  return (
    <>
      <div className="container ">
        <div className="row">
          <div className="col-sm-10 offset-sm-1 col-md-6 offset-md-3 post-card mt-5">
            {friends && friends.length > 0 ? (
              friends.map((item) => {
                return <FriendRequestList key={item.from._id} friends={item} />;
              })
            ) : (
              <div className="mt-5 mb-5 align-items-center">
                No Request Available
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendRequest;
