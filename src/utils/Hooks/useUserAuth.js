import { useContext } from "react";
import UserContext from "../Context.js/userContext";

export const useUserAuth = () => {
  const user = useContext(UserContext);
  return user;
};
