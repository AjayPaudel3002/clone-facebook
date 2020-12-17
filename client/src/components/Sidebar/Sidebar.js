import React from "react";
import "../Sidebar/Sidebar.css";
// import HomeIcon from "@material-ui/icons/Home";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import EmojiFlagsIcon from "@material-ui/icons/EmojiFlags";
import PeopleIcon from "@material-ui/icons/People";
import ChatIcon from "@material-ui/icons/Chat";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";

const Sidebar = () => {
  return (
    <>
      <div className="container-fluid sidebar ">
        <div className=" d-flex flex-row align-items-center pt-2 pb-2  sidebar-row">
          <div>
            <LocalHospitalIcon fontSize="large" />
          </div>
          <div>
            <h4 className="pl-3 m-0">Text</h4>
          </div>
        </div>
        <div className="d-flex flex-row  align-items-center  pt-2 pb-2 sidebar-row">
          <div>
            <LocalHospitalIcon fontSize="large" />
          </div>
          <div>
            <h4 className="pl-3 m-0">COVID-19 Information Center</h4>
          </div>
        </div>
        <div className="d-flex flex-row  align-items-center  pt-2 pb-2 sidebar-row">
          <div>
            <EmojiFlagsIcon fontSize="large" />
          </div>
          <div>
            <h4 className="pl-3 m-0">Pages</h4>
          </div>
        </div>
        <div className="d-flex flex-row   align-items-center  pt-2 pb-2 sidebar-row">
          <div>
            <PeopleIcon fontSize="large" />
          </div>
          <div>
            <h4 className="pl-3 m-0">Friends</h4>
          </div>
        </div>
        <div className="d-flex flex-row  align-items-center  pt-2 pb-2 sidebar-row">
          <div>
            <ChatIcon fontSize="large" />
          </div>
          <div>
            <h4 className="pl-3 m-0">Messenger</h4>
          </div>
        </div>
        <div className="d-flex flex-row  align-items-center  pt-2 pb-2 sidebar-row">
          <div>
            <VideoLibraryIcon fontSize="large" />
          </div>
          <div>
            <h4 className="pl-3 m-0">Videos</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
