import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../module/admin/SideBar";

const LayoutAdmin = () => {
  return (
    <div className="flex items-start">
      <SideBar></SideBar>
      <div className="flex-1 pl-10">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default LayoutAdmin;
