import React, { useState } from "react";
import headers from "../auth/headers";
import { Link } from "react-router-dom";

const FriendsSuggestionList = ({ friends }) => {
  const [requestSent, setRequestSent] = useState(false);

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
  //   console.log(requestSent);
  return (
    <div className="container-fuild">
      <div className="row d-flex   align-items-center p-2 pt-3 pb-3">
        <div className="col-sm-2 col-md-2 ">
          <Link to={`/user/posts/${friends._id}`}>
            <img
              src={
                friends.profilePicture
                  ? friends.profilePicture
                  : "https://res.cloudinary.com/dueq2a3w1/image/upload/v1608046828/default-image1_w8javi.jpg"
              }
              alt=""
              width="40"
            />
          </Link>
        </div>
        <div className="col-sm-5 col-md-5">
          {`${friends.firstName} ${friends.lastName}`}
        </div>
        <div className="col-sm-4 col-md-4">
          <button
            className="btn btn-primary"
            onClick={() => sendFriendRequest(friends._id)}
          >
            {requestSent ? "Request Sent" : "Add Friend"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendsSuggestionList;
