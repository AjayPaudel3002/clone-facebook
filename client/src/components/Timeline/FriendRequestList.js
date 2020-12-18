import React, { useState, useEffect } from "react";
import headers from "../auth/headers";

const FriendRequestList = ({ friends }) => {
  const [acceptReq, setAcceptReq] = useState(false);
  //   const [declineReq, setdeclineReq] = useState(false);
  //   console.log(friends);
  const handleRequest = async (toUser) => {
    try {
      const response = await fetch(`/accept-request/${toUser}`, {
        method: "put",
        mode: "cors",
        headers: headers(),
      });
      const res = await response.json();
      setAcceptReq(!acceptReq);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (friends.status === "Accepted") {
      setAcceptReq(true);
    }
  }, []);

  //   console.log(requestSent);
  return (
    <div className="container-fuild">
      <div className="row d-flex   align-items-center p-2 pt-3 pb-3">
        <div className="col-sm-2 col-md-2 ">
          <img
            src={
              friends.from.profilePicture
                ? friends.from.profilePicture
                : "https://res.cloudinary.com/dueq2a3w1/image/upload/v1608046828/default-image1_w8javi.jpg"
            }
            alt=""
            width="40"
          />
        </div>
        <div className="col-sm-5 col-md-5">
          {`${friends.from.firstName} ${friends.from.lastName}`}
        </div>
        <div className="col-sm-4 col-md-4">
          {!acceptReq && <button
            className="btn btn-primary"
            onClick={() => handleRequest(friends.from._id)}
          >
            Confirm
          </button>}
        </div>
      </div>
    </div>
  );
};

export default FriendRequestList;
