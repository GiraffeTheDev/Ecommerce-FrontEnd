import React from "react";
import { useController } from "react-hook-form";
const Input = ({
  name = "",
  placeholder = "",
  control,
  type = "text",
  className = "",
  ...rest
}) => {
  const { field } = useController({ name, control, defaultValue: "" });
  return (
    <>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        className={` px-2 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
        {...field}
      />
    </>
  );
};

export default Input;
