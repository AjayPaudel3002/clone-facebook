import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
const Friends = ({ friends }) => {
  //   console.log(currentUser.friends);
  const history = useHistory();
  return (
    <>
      <div className="container-fluid">
        <hr className="mt-5" />
        <div className="contacts-title mt-4 mb-3">Contacts</div>
        {friends &&
          friends.map((friend) => {
            console.log(friend);
            return (
              <div
                className="row d-flex align-items-center pt-2 pb-2 contacts-list"
                onClick={() => history.push(`/user/posts/${friend._id}`)}
              >
                <div className="col-sm-2">
                  <img
                    src={
                      friend.profilePicture
                        ? friend.profilePicture
                        : "https://res.cloudinary.com/dueq2a3w1/image/upload/v1608046828/default-image1_w8javi.jpg"
                    }
                    alt=""
                    className="rounded-image"
                    width="40"
                  />
                </div>
                <div className="col-sm-10">{`${friend.firstName} ${friend.lastName}`}</div>
              </div>
            );
          })}
        <hr className="mt-5" />
      </div>
    </>
  );
};

export default Friends;
