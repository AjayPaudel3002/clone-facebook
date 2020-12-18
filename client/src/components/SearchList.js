import React, { useEffect, useState } from "react";
import headers from "./auth/headers";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import "./styles.css";
import { Link } from "react-router-dom";

const SearchList = ({ person, friends }) => {
  const [requestSent, setRequestSent] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  console.log(friends);
  const sendFriendRequest = async (toUser) => {
    const postData = {
      status: "Pending",
    };
    if (requestSent) {
      postData.status = "Decline";
    }
    try {
      const response = await fetch(`/api/friend-request/${toUser}`, {
        method: "post",
        mode: "cors",
        headers: headers(),
        body: JSON.stringify(postData),
      });
      const res = await response.json();
      setRequestSent(!requestSent);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const isUserAvailable = friends.find((friend) => {
      return person._id === friend._id;
    });
    // console.log(isUserAvailable);
    if (isUserAvailable) {
      setIsFriend(true);
    }
    const addFriends = async () => {
      const response = await fetch(`/api/users/request/${person._id}`, {
        mode: "cors",
        headers: headers(),
      });
      const res = await response.json();
      console.log(res);
      if (res.data.length) {
        setRequestSent(true);
      }
    };
    if (person._id) {
      addFriends();
    }
  }, [person._id]);

  return (
    <>
      <div
        className="row d-flex align-items-center search-card pt-4 pb-4 "
        key={person._id}
      >
        <div className="col-3 col-xs-2 col-md-2  ">
          <img
            src={
              person.profilePicture
                ? person.profilePicture
                : "https://res.cloudinary.com/dueq2a3w1/image/upload/v1608046828/default-image1_w8javi.jpg"
            }
            alt=""
            className="rounded-circle"
            width="90%"
          />
        </div>
        <div className="col-7 text-left text ">
          <Link to={`/user/posts/${person._id}`}>
            <span>{`${person.firstName} ${person.lastName}`}</span>
          </Link>
        </div>
        {!isFriend && (
          <div className="col-2 text-right">
            {!requestSent ? (
              <PersonAddIcon onClick={() => sendFriendRequest(person._id)} />
            ) : (
              <PersonAddDisabledIcon
                onClick={() => sendFriendRequest(person._id)}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchList;
