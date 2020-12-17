import React from "react";
import moment from "moment";

const Comment = ({ comments }) => {
  return (
    <>
      <div className="container-fluid pl-3">
        {comments.map((comment) => {
          //   console.log(comment);
          return (
            <div>
              <div className="row pt-3 pb-3 align-items-center ">
                <div className="col-1 col-sm-1 ">
                  <img
                    src={
                      comment.user.profilePicture
                        ? comment.user.profilePicture
                        : "https://res.cloudinary.com/dueq2a3w1/image/upload/v1608046828/default-image1_w8javi.jpg"
                    }
                    alt=""
                    className="rounded-circle"
                    width="40"
                  />
                </div>
                <div className="col-11 col-sm-10 ml-2 text-left ">
                  <div className="user-comment">
                    <h3>{`${comment.user.firstName} ${comment.user.lastName}`}</h3>
                    <p>{comment.content}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-10 offset-md-1  text-left">
                  <p style={{ marginLeft: "20px" }}>
                    {" "}
                    {moment(
                      new Date(
                        comment.createdAt.split(", ").reverse().join(" ")
                      )
                    ).fromNow()}{" "}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Comment;
