import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../utils/Hooks/useUserAuth";

const Signin = () => {
  const { user, handleLogin, error } = useUserAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [signInBtnText, setSignInBtnText] = useState(false);

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCredentials({ ...credentials, [name]: value });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="w-screen mx-auto p-4 bg-black min-h-screen flex flex-col justify-center">
      <div className="sm:w-1/2 mx-auto p-2 shadow-slate-300">
        <span className="text-4xl mb-10 font-bold text-green-600">Sign In</span>
        <form
          className="w-full mt-4 flex sm:flex-col flex-col items-start"
          onSubmit={async (e) => {
            try {
              setSignInBtnText(true);
              await handleLogin(e, credentials);
            } catch (error) {
              console.warn(error?.message);
            } finally {
              setSignInBtnText(false);
            }
          }}
        >
          <label
            htmlFor="email"
            className="text-sm focus:outline-none hover:border-gray-400 text-white
          w-full
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
            sm:w-10/12 sm:mx-10
            w-full lg:w-1/2 
            "
            />
          </label>
          <label
            htmlFor="password"
            className="text-sm focus:outline-none hover:border-gray-400 text-white
          sm:text-lg
          w-full
          
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
            w-full lg:w-1/2 lg:mx-auto lg:ml-2 
            "
            />
          </label>

          {error && (
            <div className="text-sm text-red-600 font-bold mt-1">{error}</div>
          )}
          <button
            type="submit"
            className="bg-green-400 text-black p-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:border-white mt-4 mb-2 font-semibold text-lg w-full sm:mx-auto "
          >
            {signInBtnText ? "Wait for a moment..." : "Sign in"}
          </button>
        </form>
        <div>
          <span className="mt-1 text-xs focus:outline-none hover:border-gray-400 text-white">
            Not registered yet !
            <Link to="/signup">
              <span className="pl-1 text-sm font-semibold sm:text-lg">
                Sign up{" "}
              </span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signin;
