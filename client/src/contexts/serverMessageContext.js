import { createContext } from "react";

export const ServerMessageContext = createContext();

export const ServerMessageProvider = ({ children }) => {
  const serverMessage = {
    success: "",
    error: "",
  };

  return (
    <ServerMessageContext.Provider value={{ serverMessage }}>
      {children}
    </ServerMessageContext.Provider>
  );
};
