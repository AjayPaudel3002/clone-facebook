import React from "react";
import VideocamIcon from "@material-ui/icons/Videocam";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import InsertEmationIcon from "@material-ui/icons/InsertEmoticon";

const CreatePost = ({ setShowModal, currentUser }) => {
  return (
    <>
      <div className="container-fluid post-card">
        <div className="row d-flex pt-3 pb-3 feed align-items-center">
          <div className="col-xs-1 col-sm-1">
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
          <div className="col-xs-11 col-sm-11">
            <div className="container-fluid ">
              <div className="row">
                <div className="col text-left">
                  <button
                    type="button"
                    className="form-control feed-input"
                    //   className="feed-input "
                    placeholder="What's on your mind , User"
                    onClick={() => setShowModal(true)}
                    data-bs-target="#postModal"
                  >
                    Whats in your mind
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
        <div className="row pb-3">
          <div className="col-4 col-md-4 d-flex align-items-center justify-content-center upload-icons">
            <VideocamIcon fontSize="large" style={{ color: "red" }} />
            <h3>Live Video</h3>
          </div>
          <div className=" col-4 col-md-4 d-flex align-items-center justify-content-center upload-icons">
            <PhotoLibraryIcon
              fontSize="large"
              style={{ color: "lightgreen" }}
            />
            <div onClick={() => setShowModal(true)}>
              Photo/Video
              {/* <input type="file" name="image" accept=".png, .jpg, .jpeg" /> */}
            </div>
          </div>
          <div className=" col-4 col-md-4 d-flex align-items-center justify-content-center upload-icons">
            <InsertEmationIcon fontSize="large" style={{ color: "orange" }} />
            <h3>Feeling/Activity</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
