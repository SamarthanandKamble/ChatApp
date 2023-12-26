import React from "react";
import { LogOut } from "react-feather";
const Navbar = () => {
  return (
    <div className="w-8/12 mx-auto p-1 border bg-black text-white flex items-center justify-between">
      <span className="text-md font-semibold">Hey User,</span>
      <span>
        <LogOut size={20} />
      </span>
    </div>
  );
};

export default Navbar;
