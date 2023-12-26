import React, { useState } from "react";
import { Link } from "react-router-dom";
import { account } from "../utils/appwriteConfig";

const Signin = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSignIn = async () => {
    const response = await account.createEmailSession(
      credentials.email,
      credentials.password
    );
    console.log("response:", response);
  };

  return (
    <div className="border border-black w-10/12 mx-auto mt-32 p-4 bg-black">
      <span className="text-4xl mb-10 font-bold text-green-600">Sign In</span>
      <form className="w-full mt-4" onSubmit={handleInputChange}>
        <label
          htmlFor="email"
          className="text-sm focus:outline-none hover:border-gray-400 text-white"
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
            className="p-2 mt-1 mb-2 border border-green-300 rounded focus:outline-none focus:border-green-500 hover:border-gray-400 text-black"
          />
        </label>
        <label
          htmlFor="password"
          className="text-sm focus:outline-none hover:border-gray-400 text-white"
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
            className="p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-green-500 hover:border-gray-400 text-black"
          />
        </label>
      </form>
      <button
        type="submit"
        className="bg-green-400 text-black p-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2  focus:border-white mt-4 mb-2 font-semibold"
        onClick={handleSignIn}
      >
        Sign in
      </button>
      <div>
        <span className="mt-1 text-xs focus:outline-none hover:border-gray-400 text-white">
          Not registered yet !
          <Link to="/signup">
            <span className="pl-1 text-sm font-semibold">Sign up </span>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Signin;
