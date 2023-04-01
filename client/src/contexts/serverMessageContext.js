import { createContext } from "react";

export const ServerMessageContext = createContext();

export const ServerMessageProvider = ({ children }) => {
  const successMessage = {};

  return (
    <ServerMessageContext.Provider value={{ successMessage }}>
      {children}
    </ServerMessageContext.Provider>
  );
};
