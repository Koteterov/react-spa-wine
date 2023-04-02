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

  const notAuthenticated = !!user.message;

  return (
    <UserContext.Provider value={{ user, updateNav, notAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};
