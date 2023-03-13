import React from "react";
import useAuthenticator from "../useAuthProvider/useAuthProvider";

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const value = useAuthenticator();
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
