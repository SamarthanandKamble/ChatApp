import React, { useState, useEffect } from "react";
import UserContext from "./userContext";
import { account, ID } from "../appwriteConfig";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getUserOnLoad();
  }, []);

  const getUserOnLoad = async () => {
    try {
      const accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      console.warn(error?.message);
    }
    setLoading(false);
  };
  const handleLogin = async (e, credentials) => {
    e.preventDefault();
    try {
      await account.createEmailSession(credentials.email, credentials.password);
      const accountDetails = await account.get();
      console.log("Signin response :", accountDetails);
      if (accountDetails?.$id) {
        setUser(accountDetails);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignup = async (e, credentials) => {
    try {
      e.preventDefault();
      const signupResponse = await account.create(
        ID.unique(),
        credentials.email,
        credentials.password,
        credentials.username
      );
      await account.createEmailSession(credentials.email, credentials.password);
      const accountDetails = await account.get();
      if (accountDetails?.$id) {
        setUser(signupResponse);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    const logoutResponse = await account.deleteSessions();
    if (logoutResponse) {
      setUser(null);
    }
  };
  const contextData = { user, handleLogin, error, handleSignup, handleLogout };

  return (
    <UserContext.Provider value={contextData}>
      {loading ? <p>Loading ...</p> : children}
    </UserContext.Provider>
  );
};

export default UserProvider;
