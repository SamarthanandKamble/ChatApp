import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useUserAuth } from "../utils/Hooks/useUserAuth";
import Navbar from "./Navbar";
const Body = () => {
  const { user } = useUserAuth();

  return (
    <div>
      {user ? (
        <>
          <Navbar />
          <Outlet />
        </>
      ) : (
        <Navigate to="/signin" />
      )}
    </div>
  );
};

export default Body;