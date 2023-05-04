import React from "react";
import SideBar from "../../Components/SideBar";
import "./style.css";
const DashBoard = (props) => {
  return (
    <div>
      <div className="sidebar-container">
        <SideBar var={props.var} />
      </div>
      <div className="contacts-container">{props.content}</div>
    </div>
  );
};

export default DashBoard;
