import { createContext } from "react";
import { useEffect, useState } from "react";
import * as userService from "../services/userService";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    userService.getProfile().then((profile) => {
      setUser(profile);
    });
  }, []);

  function updateNav(userData) {
    setUser(userData);
  }

  return (
    <UserContext.Provider value={{ user, updateNav }}>
      {children}
    </UserContext.Provider>
  );
};
