import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../module/home/NavBar";

const LayoutHome = () => {
  return (
    <>
      <NavBar></NavBar>

      <Outlet></Outlet>
    </>
  );
};

export default LayoutHome;
