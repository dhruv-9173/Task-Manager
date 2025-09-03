import { createContext, useEffect } from "react";
import { useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const obj = { email: "", token: "" };
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(obj);

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) Signin(loggedUser);
  }, []);

  const Signin = (x) => {
    setUser(x);
    setIsAuthenticated(true);
  };
  const Signout = () => {
    localStorage.removeItem("user");
    setUser(obj);
    setIsAuthenticated(false);
  };

  const getUser = () => {
    return user;
  };

  return (
    <AuthContext.Provider value={{ Signin, Signout, getUser, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
