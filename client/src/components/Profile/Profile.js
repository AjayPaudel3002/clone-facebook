import React, { useState, useEffect } from "react";
import Header from "../Nav/Header";
import EditProfile from "./EditProfile";
import headers from "../auth/headers";
import Post from "../Timeline/Post";

const Profile = ({ currentUser }) => {
  const [profilepic, setProfilePic] = useState("");
  const [coverPic, setCoverPic] = useState("");
  const [posts, setPosts] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const getUserPosts = async () => {
      const response = await fetch(`/user/posts/${currentUser._id}`, {
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
          <div className="col-sm-10 offset-sm-1 col-lg-8 offset-lg-2 col-xxl-6 offset-xxl-3">
            <EditProfile
              setProfilePic={setProfilePic}
              setCoverPic={setCoverPic}
              profilePic={profilepic}
              coverPic={coverPic}
              currentUser={currentUser}
              setUserDetails={setUserDetails}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            {posts && posts.length ? (
              posts.map((item) => (
                <Post key={item._id} posts={item} currentUser={userDetails} />
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

export default Profile;
