import React, { useState, useEffect } from "react";
import UserContext from "./userContext";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const contextData = { user };
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <UserContext.Provider value={contextData}>
      {loading ? <p>Loading ...</p> : children}
    </UserContext.Provider>
  );
};

export default UserProvider;
