import React, { useState, useEffect } from "react";
import Post from "../components/Timeline/Post";
import headers from "./auth/headers";


const UserPosts = ({ currentUser, logOut ,  match }) => {
    // console.log(logOut, "cuuu");
  const id = match.params.id;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getUserPosts = async () => {
      const response = await fetch(`/user/posts/${id}`, {
        mode: "cors",
        headers: headers(),
      });
      const userPosts = await response.json();
      console.log(userPosts);
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
              <div className="mt-5 d-flex justify-content-center ">
                No Posts Available
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPosts;
