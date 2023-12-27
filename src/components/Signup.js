import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../utils/Hooks/useUserAuth";
const Signup = () => {
  const navigate = useNavigate();

  const { user, error, handleSignup } = useUserAuth();
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = async (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCredentials({ ...credentials, [name]: value });
  };

  useEffect(() => {
    if (user) {
      navigate("/signin");
    }
  }, [user]);

  return (
    <div className="border border-black w-10/12 mx-auto mt-28 p-4 bg-black sm:w-10/12">
      <span className="text-4xl mb-10 font-bold text-green-600">Sign Up</span>
      <form
        className="w-full mt-4 sm:flex sm:flex-col"
        onSubmit={(e) => handleSignup(e, credentials)}
      >
        <label
          htmlFor="username"
          className="text-sm focus:outline-none hover:border-gray-400 text-white
          sm:w-full
          sm:text-lg
          "
        >
          User name
          <input
            id="username"
            type="text"
            name="username"
            required
            placeholder="Enter username"
            value={credentials.username}
            onChange={handleInputChange}
            className="p-2 mt-1 mb-2 border border-green-300 rounded focus:outline-none focus:border-green-500 hover:border-gray-400 text-black
             sm:w-10/12 sm:mx-8
            "
          />
        </label>
        <label
          htmlFor="email"
          className="text-sm focus:outline-none hover:border-gray-400 text-white
           sm:w-full
          sm:text-lg
          "
        >
          Email
          <input
            id="email"
            type="email"
            name="email"
            required
            placeholder="Enter email"
            value={credentials.email}
            onChange={handleInputChange}
            className="p-2 mt-1 mb-2 border border-green-300 rounded focus:outline-none focus:border-green-500 hover:border-gray-400 text-black
             sm:w-10/12 sm:mx-8
            "
          />
        </label>
        <label
          htmlFor="password"
          className="text-sm focus:outline-none hover:border-gray-400 text-white
           sm:w-full
          sm:text-lg
          "
        >
          Password
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter password"
            required
            value={credentials.password}
            onChange={handleInputChange}
            className="p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-green-500 hover:border-gray-400 text-black
             sm:w-10/12 sm:mx-8
            "
          />
        </label>

        {error && (
          <div className="text-sm text-red-600 font-bold mt-1">{error}</div>
        )}
        <button
          type="submit"
          className="bg-green-400 text-black p-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2  focus:border-white mt-4 mb-2 font-semibold text-lg"
        >
          Sign Up
        </button>
      </form>
      <div>
        <span className="mt-1 text-xs focus:outline-none hover:border-gray-400 text-white">
          Already registered?
          <Link to="/signin">
            <span className="pl-1 text-sm font-semibold sm:text-lg">
              Sign In
            </span>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Signup;
