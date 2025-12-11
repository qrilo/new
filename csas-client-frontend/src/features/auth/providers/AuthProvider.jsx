import { useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || null;
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem("accessToken") || null;
  });

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedRole = localStorage.getItem("role");
    const storedToken = localStorage.getItem("accessToken");

    if (storedAuth === "true" && storedRole && storedToken) {
      setIsAuthenticated(true);
      setRole(storedRole);
      setToken(storedToken);
    }
  }, []);

  const login = (token, role, pinLength, bankId) => {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("accessToken", token || "");
    localStorage.setItem("role", role || "");
    localStorage.setItem("pinLength", pinLength || "");
    localStorage.setItem("bankId", bankId || "");

    setRole(role);
    setToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    localStorage.removeItem("pinLength");
    localStorage.removeItem("bankId", bankId || "");

    setRole(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    role,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
