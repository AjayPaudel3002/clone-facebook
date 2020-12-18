import React, { useState, useEffect } from "react";
import "../Timeline/Styles.css";
import CreatePostModal from "./CreatePostModal";
import CreatePost from "./CreatePost";
import Post from "./Post";
import headers from "../auth/headers";

const Feed = ({ currentUser, socket }) => {
  const [showModal, setShowModal] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [posts, setPosts] = useState([]);
  //   console.log(user || "");

  const postCreate = async (e) => {
    e.preventDefault();
    const postData = {
      content,
      image,
    };
    // console.log(postData);
    try {
      const response = await fetch("/api/add-post", {
        method: "post",
        mode: "cors",
        headers: headers(),
        body: JSON.stringify(postData),
      });
      const res = await response.json();
      console.log(res, "res");
      if (res.errors) {
        setErrors(res.errors);
        return;
      }
      setPosts((posts) => [res.data, ...posts]);
      socket.emit("newPost", res.data);
      setImage("");
      setContent("");
      setImagePreview("");
      setShowModal(!showModal);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleModal = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
  };

  const handleFile = (e) => {
    //   console.log(e.target.value)
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const [showLoader, setShowLoader] = useState(true);
  const friends =
    currentUser.friends && currentUser.friends.map((friend) => friend._id);
  //console.log(friends, "frie");
  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(`/api/all-posts`, {
        headers: headers(),
      });
      const postsData = await response.json();
      //   console.log(postsData.data);
      setPosts(postsData.data);
      setShowLoader(!showLoader);
      socket.on("newPost", (post) => {
        // console.log(post, "client");
        if (
          post.user._id !== currentUser._id &&
          friends.includes(post.user._id)
        ) {
          setPosts((posts) => [post, ...posts]);
        }
      });
    };
    if (currentUser._id) {
      getPosts();
    }
    return function () {
      socket.off("newPost");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser._id]);

  //   console.log(posts, "posts");
  return (
    <>
      {showModal && (
        <CreatePostModal
          onRequestClose={toggleModal}
          imagePreview={imagePreview}
          setImage={setImage}
          handleFile={handleFile}
          postCreate={postCreate}
          setContent={setContent}
          currentUser={currentUser}
        />
      )}
      <CreatePost setShowModal={setShowModal} currentUser={currentUser} />

      {posts.length > 0 ? (
        posts.map((item) => {
          console.log(item, "item");
          return <Post posts={item} currentUser={currentUser} key={item._id} />;
        })
      ) : (
        <div className=" post-card mt-5 mb-5  align-items-center">
          <div className="pt-5 pb-5">No Posts Available</div>
        </div>
      )}
    </>
  );
};

export default Feed;
