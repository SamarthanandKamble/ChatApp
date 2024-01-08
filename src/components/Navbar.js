import React from "react";
import { LogOut } from "react-feather";
import { useUserAuth } from "../utils/Hooks/useUserAuth";
const Navbar = () => {
  const { user, handleLogout } = useUserAuth();
  return (
    <div className="w-full mx-auto p-2 bg-black text-white flex items-center justify-between text-xl sm:text-lg border">
      <span className="text-md font-semibold">Hey {user?.name},</span>
      <span onClick={(e) => handleLogout()} className="cursor-pointer">
        <LogOut size={20} />
      </span>
    </div>
  );
};

export default Navbar;
