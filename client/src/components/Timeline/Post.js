import React, { useState, useEffect } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import Comment from "./Comment";
import headers from "../auth/headers";
import moment from "moment";
import "./Styles.css";

const Post = ({ posts, currentUser }) => {
  const { comments, user, image, content, createdAt } = posts;
  const [comment, setComment] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentCount, setCommentCount] = useState(0);
  const [LikeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  // console.log(user._id , currentUser._id ,  "user")
  const createComments = async (e) => {
    e.preventDefault();
    const commentData = {
      content: commentText,
    };
    setCommentText("");
    // console.log(commentData);
    try {
      const response = await fetch(`/add-comment/${posts._id}`, {
        method: "post",
        mode: "cors",
        headers: headers(),
        body: JSON.stringify(commentData),
      });
      const res = await response.json();
      //   console.log(res.data, comments, "res");
      setComment((comment) => [...comment, res.data]);
      setCommentCount((prevState) => prevState + 1);
    } catch (error) {
      console.error(error);
    }
  };
  //   console.log(comment, commentText, "com");

  useEffect(() => {
    console.log(posts);
    setLikeCount(posts.reactors.length);
    const isLiked = posts.reactors.find((user) => {
      //   console.log(user, "user");
      return user.reactor._id === currentUser._id;
    });
    console.log(isLiked, "islike");
    if (isLiked) {
      setLiked(true);
      
    }
    if (comments) {
      setComment(comments);
      setCommentCount(comments.length);
    }
  }, [currentUser._id]);
  //   console.log(LikeCount , "like")

  const addLike = async () => {
    const likeData = {
      type: "like",
    };
    if (!liked) {
      try {
        const response = await fetch(`/add-reactions/${posts._id}`, {
          method: "post",
          mode: "cors",
          headers: headers(),
          body: JSON.stringify(likeData),
        });
        const res = await response.json();
        // const isLiked = posts.reactors.find((user) => {
        //   return user.reactor._id === currentUser._id;
        // });
        if (res) {
          setLikeCount((prevState) => prevState + 1);
          setLiked(true);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await fetch(`/delete/reaction/${posts._id}`, {
          method: "delete",
          mode: "cors",
          headers: headers(),
        });
        const res = await response.json();
        if (res) {
          setLiked(false);
          setLikeCount((prevState) => prevState - 1);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // console.log(user , currentUser._id , " cu");
  // console.log(
  //   moment(new Date(createdAt)).fromNow()
  // );
  return (
    <>
      <div className="container-fluid post-card mt-4">
        <div className="row pt-3 pb-3 pr-3">
          <div className="col-10 col-xs-11 col-sm-11 d-flex align-items-center">
            <img
              src={
                currentUser.profilePicture
                  ? currentUser.profilePicture
                  : "https://res.cloudinary.com/dueq2a3w1/image/upload/v1608046828/default-image1_w8javi.jpg"
              }
              alt=""
              width="40"
              className="rounded-circle"
            />
            <h2 className="modal-title">
              {`${user.firstName} ${user.lastName}`}
              <br />{" "}
              <span style={{ fontSize: "14px" }}>
                {moment(new Date(createdAt)).fromNow()}
              </span>
            </h2>
          </div>
          {currentUser._id === user._id ? (
            <div className="col-1 col-xs-1 col-sm-1 ">
              <div className="dropdown">
                <button
                  class="btn  dropdown-toggle dropbtn"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ></button>
                <div className="dropdown-content ">
                  <a>Edit</a>
                  <a>Delete</a>
                </div>
              </div>
            </div>
          ) : (
            " "
          )}
        </div>
        <div className="row pl-3 pr-3 pb-3 text-left">
          <p>{content}</p>
          <img src={image} alt="" width="100%" />
        </div>
        <div className="row d-flex justify-content-between  pr-3 pl-3">
          <p>
            {/* {posts.reactors[0] && posts.reactors[0].reactor.firstName}  */}
            {LikeCount} liked
          </p>
          <p>{`${commentCount} comments`}</p>
        </div>
        <div className="row p-2 " style={{ border: "1px solid #dae0e5" }}>
          <div
            className={`col-6 like ${liked ? "coloured" : ""}`}
            onClick={addLike}
          >
            <ThumbUpIcon className={liked ? "coloured" : ""} />
            <span className={liked ? "coloured" : ""}>Like</span>
          </div>
          <div className="col-6 comment">
            <ChatBubbleOutlineIcon /> <span>Comment</span>
          </div>
        </div>

        {<Comment comments={comment} />}
        <div className="row pt-3 pb-3">
          <div className="col-1 col-sm-1 ">
            <img
              src={
                currentUser.profilePicture
                  ? currentUser.profilePicture
                  : "https://res.cloudinary.com/dueq2a3w1/image/upload/v1608046828/default-image1_w8javi.jpg"
              }
              alt=""
              className="rounded-circle"
              width="40"
            />
          </div>
          <div className="col-11 col-sm-10 ml-2 ">
            <form onSubmit={(e) => createComments(e)}>
              <input
                type="text"
                className="form-control feed-input"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
