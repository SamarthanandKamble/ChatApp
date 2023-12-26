import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useUserAuth } from "../utils/Hooks/useUserAuth";

const Body = () => {
  const { user } = useUserAuth();
  return <div>{user ? <Outlet /> : <Navigate to="/signin" />}</div>;
};

export default Body;
