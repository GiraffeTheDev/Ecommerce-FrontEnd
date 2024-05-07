import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../store/auth/handlers";

const Logout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(handleLogout());
    if (!user) {
      navigate("/sign-in");
    }
  }, [dispatch, user, navigate]);
  return <></>;
};

export default Logout;
