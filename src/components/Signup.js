import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ID, account } from "../utils/appwriteConfig";
const Signup = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const handleInputChange = async (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleAccountCreation = async () => {
    try {
      console.log("email", credentials.email);
      console.log("pass", credentials.password);
      const signupResponse = await account.create(
        ID.unique(),
        credentials.email,
        credentials.password
      );
      console.log("reposne :-", signupResponse);

      if (signupResponse?.$id) {
        navigate("/signin");
      }
      setCredentials({ username: "", email: "", password: "" });
    } catch (error) {
      console.warn("err:-", error?.message);
      setError(error.message);
      setCredentials({ username: "", email: "", password: "" });
    }
  };
  return (
    <div className="border border-black w-10/12 mx-auto mt-28 p-4 bg-black">
      <span className="text-4xl mb-10 font-bold text-green-600">Sign Up</span>
      <form className="w-full mt-4" onSubmit={handleInputChange}>
        <label
          htmlFor="username"
          className="text-sm focus:outline-none hover:border-gray-400 text-white"
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
            className="p-2 mt-1 mb-2 border border-green-300 rounded focus:outline-none focus:border-green-500 hover:border-gray-400 text-black"
          />
        </label>
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
      {error && (
        <div className="text-sm text-red-600 font-bold mt-1">{error}</div>
      )}
      <button
        type="submit"
        className="bg-green-400 text-black p-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2  focus:border-white mt-4 mb-2 font-semibold"
        onClick={handleAccountCreation}
      >
        Sign Up
      </button>
      <div>
        <span className="mt-1 text-xs focus:outline-none hover:border-gray-400 text-white">
          Already registered?
          <Link to="/signin">
            <span className="pl-1 text-sm font-semibold">Sign In </span>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Signup;
