import React from "react";

const Heading = ({ title = "" }) => {
  return (
    <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
      {title}
    </h2>
  );
};

export default Heading;
