import React, { useState, useEffect } from "react";
import Post from "../components/Timeline/Post";
import headers from "./auth/headers";

const UserPosts = ({ currentUser, logOut, match }) => {
  const id = match.params.id;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getUserPosts = async () => {
      const response = await fetch(`/api/user/posts/${id}`, {
        mode: "cors",
        headers: headers(),
      });
      const userPosts = await response.json();
      setPosts(userPosts.data);
    };
    if (currentUser) {
      getUserPosts();
    }
  }, [currentUser._id]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            {posts.length ? (
              posts.map((item) => (
                <Post key={item._id} posts={item} currentUser={currentUser} />
              ))
            ) : (
              <div className=" post-card mt-5 mb-5  align-items-center">
                <div className="pt-5 pb-5">No Posts Available</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPosts;
