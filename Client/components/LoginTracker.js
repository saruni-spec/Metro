import React, { useState } from "react";

export const Context = React.createContext();
export const LoginTracker = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Context.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </Context.Provider>
  );
};
