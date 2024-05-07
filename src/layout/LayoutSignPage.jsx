import React from "react";
import { Outlet } from "react-router-dom";

const LayoutSignPage = () => {
  return (
    <>
      <div className="flex flex-col justify-center flex-1 min-h-full px-6 lg:px-8">
        <div className="pt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
          <img src="/logo.svg" alt="" className="object-cover sm:mx-auto" />
        </div>
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default LayoutSignPage;
