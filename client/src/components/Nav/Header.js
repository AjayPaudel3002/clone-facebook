import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import FlagIcon from "@material-ui/icons/Flag";
import SubscriptionsOutlinedIcon from "@material-ui/icons/SubscriptionsOutlined";
import StoreFrontOutLinedIcon from "@material-ui/icons/StorefrontOutlined";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
// import AddIcon from "@material-ui/icons/Add";
import ForumIcon from "@material-ui/icons/Forum";
import "../Nav/Header.css";
import { IconButton } from "@material-ui/core";

// import { ExpandMore } from "@material-ui/icons";

const Header = ({ currentUser, logOut }) => {
  console.log(logOut);
  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");

  const searchPeople = async (e) => {
    e.preventDefault();
    history.push(`/users/search?q=${searchValue}`);
    setSearchValue("");
  };

  return (
    <>
      <div className="container-fluid pt-2 header">
        <div className="row">
          <div className="col-md-3">
            <div className="row pt-2">
              <div className="col-md-2 ">
                <img
                  src="https://res.cloudinary.com/dueq2a3w1/image/upload/v1607583958/Facebook%20Clone/fb-logo_octlga.png"
                  alt=""
                  width="40px"
                />
              </div>
              <div className="col-md-10 ">
                <form className="header-left" onSubmit={(e) => searchPeople(e)}>
                  <SearchIcon className="searchIcon ml-2" />
                  <input
                    className="header-input"
                    type="search"
                    placeholder="Search People"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-4 offset-md-1 pt-2">
            <div className="d-flex flex-row  justify-content-between mb-3">
              <div className=" header-icons ">
                <HomeIcon
                  fontSize="large"
                  onClick={() =>
                    history.push(`/users/${currentUser._id}/timeline`)
                  }
                />
              </div>
              <div className=" header-icons ">
                <FlagIcon fontSize="large" />
              </div>
              <div className=" header-icons ">
                <SubscriptionsOutlinedIcon fontSize="large" />
              </div>
              <div className=" header-icons ">
                <StoreFrontOutLinedIcon fontSize="large" />
              </div>
              <div className=" header-icons ">
                <SupervisedUserCircleIcon
                  fontSize="large"
                  onClick={() =>
                    history.push(`/user/${currentUser._id}/requests`)
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-md-3 offset-md-1 ">
            <div className="d-flex flex-row  justify-content-between ">
              <div
                className=" account "
                onClick={() => history.push(`/user/profile`)}
              >
                {" "}
                <img
                  src={
                    currentUser.profilePicture
                      ? currentUser.profilePicture
                      : "https://res.cloudinary.com/dueq2a3w1/image/upload/v1608046828/default-image1_w8javi.jpg"
                  }
                  alt=""
                  width="40px"
                  className="mr-2 rounded-circle"
                />
                <span>
                  {currentUser.firstName + " " + currentUser.lastName}
                </span>
              </div>
              <IconButton>
                <ForumIcon />
              </IconButton>
              <IconButton>
                <NotificationsActiveIcon />
              </IconButton>
              <div className="dropdown">
                <button
                  class="btn  dropdown-toggle dropbtn"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ></button>
                <div className="dropdown-content ">
                  <a onClick={logOut}>Logout</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
