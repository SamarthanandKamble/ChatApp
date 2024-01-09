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
  const [signUpBtnText, setSignUpBtnText] = useState(false);

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
    <div className=" w-full min-h-screen mx-auto p-4 bg-black flex flex-col justify-center ">
      <div className="w-full sm:w-1/2 mx-auto p-2 shadow-slate-300">
        <span className="text-4xl mb-10 font-bold text-green-600">Sign Up</span>
        <form
          className="w-full mt-4 sm:flex sm:flex-col"
          onSubmit={async (e) => {
            try {
              setSignUpBtnText(true);
              await handleSignup(e, credentials);
            } catch (error) {
              console.warn(error?.message);
            } finally {
              setSignUpBtnText(false);
            }
          }}
        >
          <label
            htmlFor="username"
            className="text-sm focus:outline-none hover:border-gray-400 text-white
          sm:w-full
          sm:text-lg 
          w-full
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
              className="p-2 mt-1 border border-green-300 rounded focus:outline-none focus:border-green-500 hover:border-gray-400 text-black
             sm:w-10/12 sm:mx-8 w-full lg:w-2/3 lg:ml-6
            "
            />
          </label>
          <label
            htmlFor="email"
            className="text-sm focus:outline-none hover:border-gray-400 text-white
           sm:w-full
          sm:text-lg
          lg:w-full 
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
              className="p-2 mt-1 border border-green-300 rounded focus:outline-none focus:border-green-500 hover:border-gray-400 text-black
             sm:w-10/12 sm:mx-8 w-full lg:w-2/3 lg:ml-16
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
             sm:w-10/12 sm:mx-8 w-full lg:w-2/3
            "
            />
          </label>

          {error && (
            <div className="text-sm text-red-600 font-bold mt-1">{error}</div>
          )}
          <button
            type="submit"
            className="bg-green-400 text-black p-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2  focus:border-white mt-4 mb-2 font-semibold text-lg w-full"
          >
            {signUpBtnText ? "Yey! Wait for a moment ..." : "Sign Up"}
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
    </div>
  );
};

export default Signup;
