import { NavLink } from "react-router-dom";
import LoadingSpiner from "../loading/LoadingSpiner";
const Button = ({
  children,
  type,
  className,
  onClick = () => {},
  isLoading = false,
  disable,
  ...props
}) => {
  const { to } = props;
  const child = isLoading ? <LoadingSpiner></LoadingSpiner> : children;
  if (to !== "" && typeof to === "string") {
    return (
      <NavLink to={to}>
        <button
          type={type}
          className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${className}`}
        >
          {children}
        </button>
      </NavLink>
    );
  }
  return (
    <button
      type={type}
      className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${className}`}
      onClick={onClick}
      disabled={disable}
    >
      {child}
    </button>
  );
};

export default Button;
