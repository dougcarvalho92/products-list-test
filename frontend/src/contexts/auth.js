import React, { createContext } from "react";
import useAuth from "./hooks/useAuth";

const Context = createContext();

function AuthProvider({ children }) {
  const {
    authenticated,
    loading,
    user,
    handleLogin,
    handleLogout,
    handleCreateUser,
  } = useAuth();

  return (
    <Context.Provider
      value={{
        loading,
        authenticated,
        user,
        handleLogin,
        handleCreateUser,
        handleLogout,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
