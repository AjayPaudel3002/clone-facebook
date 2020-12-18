import React, { useState, useEffect } from "react";
import headers from "../auth/headers";
import FriendsSuggestionList from "./FriendsSuggestionList";

const FriendsSuggestion = ({ currentUser }) => {
  //   console.log(currentUser);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const response = await fetch("/api/non-friends-list", {
        headers: headers(),
      });
      const friendsList = await response.json();
      //   console.log(friendsList);
      setFriends(friendsList.data);
    };
    if (currentUser._id) {
      getFriends();
    }
  }, [currentUser._id]);

  return (
    <>
      <div className="container text-left post-card">
        <h2>Find People</h2>
        {friends && friends.length ? (
          friends.map((item) => {
            return <FriendsSuggestionList key={item._id} friends={item} />;
          })
        ) : (
          <div className="mt-4">No New Friends Available</div>
        )}
      </div>
    </>
  );
};

export default FriendsSuggestion;
