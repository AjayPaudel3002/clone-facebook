import React from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";

const CreatePostModal = ({
  onRequestClose,
  handleFile,
  imagePreview,
  postCreate,
  setContent,
  currentUser,
}) => {
  // Use useEffect to add an event listener to the document

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-11 d-flex align-items-center">
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
              <h3 className="modal-title">{`${currentUser.firstName} ${currentUser.lastName}`}</h3>
            </div>
            <div className="col-sm-1 align-items-center">
              <HighlightOffIcon onClick={onRequestClose} />
            </div>
          </div>
          <div className="row ">
            <textarea
              className="form-control m-3"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="whats in your mind"
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div>
            <img src={imagePreview} alt="" width="80%" />
          </div>
          <div className="d-flex upload-icons align-items-center justify-content-center p-2">
            <PhotoLibraryIcon
              fontSize="large"
              style={{ color: "lightgreen" }}
            />
            <div>
              <input
                type="file"
                id="upload"
                accept=".png, .jpg, .jpeg"
                hidden
                onChange={(e) => handleFile(e)}
              />
              <label for="upload">Photo/Video</label>
            </div>
          </div>
          <div className="pt-2">
            <button
              className="btn btn-primary btn-lg btn-block"
              onClick={postCreate}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
