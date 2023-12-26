import React, { useState, useEffect } from "react";
import UserContext from "./userContext";
import { account, ID } from "../appwriteConfig";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleLogin = async (e, credentials) => {
    e.preventDefault();
    console.log("lifted state up");
    try {
      const signinResponse = await account.createEmailSession(
        credentials.email,
        credentials.password
      );
      const accountDetails = await account.get();
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
      console.log("email", credentials.email);
      console.log("pass", credentials.password);
      const signupResponse = await account.create(
        ID.unique(),
        credentials.email,
        credentials.password
      );
      console.log("response :-", signupResponse);

      if (signupResponse?.$id) {
        setUser(signupResponse);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const contextData = { user, handleLogin, error, handleSignup };

  return (
    <UserContext.Provider value={contextData}>
      {loading ? <p>Loading ...</p> : children}
    </UserContext.Provider>
  );
};

export default UserProvider;
