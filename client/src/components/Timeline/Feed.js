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

  const postCreate = async (e) => {
    e.preventDefault();
    const postData = {
      content,
      image,
    };

    try {
      const response = await fetch("/api/add-post", {
        method: "post",
        mode: "cors",
        headers: headers(),
        body: JSON.stringify(postData),
      });
      const res = await response.json();

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

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(`/api/all-posts`, {
        headers: headers(),
      });
      const postsData = await response.json();

      setPosts(postsData.data);
      setShowLoader(!showLoader);
      socket.on("newPost", (post) => {
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
  }, [currentUser._id]);

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
