import React, { useEffect, useState } from "react";
import "../styles.css";
import headers from "../auth/headers";
import { render } from "@testing-library/react";

const EditProfile = ({
  setProfilePic,
  setCoverPic,
  profilePic,
  coverPic,
  currentUser,
}) => {
  const [profilePreview, setProfilePreview] = useState("");
  const [coverPreview, setCoverPreview] = useState("");

  const handleFile = (e, setPreview, setImage, photoCategory) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = async () => {
      setImage(reader.result);
      console.log(photoCategory);
      const postData =
        photoCategory === "profilePicture"
          ? { profilePicture: reader.result }
          : { coverPhoto: reader.result };
      try {
        const response = await fetch("/users/edit", {
          mode: "cors",
          headers: headers(),
          body: JSON.stringify(postData),
          method: "put",
        });
        const res = await response.json();
        console.log(res);
        console.log(postData);
      } catch (error) {
        console.log(error);
      }
    };
  };

  useEffect(() => {
    setProfilePreview(currentUser.profilePicture);
    setCoverPreview(currentUser.coverPhoto);
  }, []);

  return (
    <>
      <div className="container intro">
        <div className="user-images">
          <div className="cover-photo-container">
            <label htmlFor="cover-pic">
              <img
                src={
                  coverPreview
                    ? coverPreview
                    : "https://res.cloudinary.com/dueq2a3w1/image/upload/v1608046828/default-image1_w8javi.jpg"
                }
                alt=""
                className="cover-photo"
              />
            </label>
            <input
              type="file"
              id="cover-pic"
              accept=".png, .jpg, .jpeg"
              hidden
              onChange={(e) =>
                handleFile(e, setCoverPreview, setCoverPic, "coverPhoto")
              }
            />
          </div>
          <label htmlFor="profile-pic">
            <img
              src={
                profilePreview
                  ? profilePreview
                  : "https://res.cloudinary.com/dueq2a3w1/image/upload/v1608046828/default-image1_w8javi.jpg"
              }
              alt=""
              className="profile-picture"
              //   onClick={updateProfilePic}
            />
          </label>
          <input
            type="file"
            id="profile-pic"
            accept=".png, .jpg, .jpeg"
            hidden
            onChange={(e) =>
              handleFile(e, setProfilePreview, setProfilePic, "profilePicture")
            }
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
