import { useState, useEffect } from "react";

import api from "../../services/api";

import * as auth from "../../services/AuthenticationServices";
import history from "../../history";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    async function checkLogin() {
      const storageUser = localStorage.getItem("Auth:user");
      const storageToken = localStorage.getItem("Auth:token");
      if (storageUser && storageToken) {
        api.defaults.headers.Authorization = `Bearer ${storageToken}`;
        setUser(JSON.parse(storageUser));
        setAuthenticated(true);
        // await api.get("/token").then(({ status }) => {
        //   if (status === 200) {
        //     setUser(JSON.parse(storageUser));
        //     setAuthenticated(true);
        //   } else {
        //     setAuthenticated(false);
        //     localStorage.clear();
        //     api.defaults.headers.Authorization = undefined;
        //     history.push("/");
        //   }
        // });
      }
    }
    checkLogin();
    setLoading(false);
  }, []);

  async function handleLogin(credentials) {
    const { token, ...userData } = await auth.login(credentials);
    localStorage.setItem("Auth:user", JSON.stringify(userData));
    localStorage.setItem("Auth:token", token);
    api.defaults.headers.Authorization = `Bearer ${token}`;

    setUser(userData);
    setAuthenticated(true);
    history.push("/products");
  }
  async function handleCreateUser(name, email, password, level) {
    const { token, ...userData } = await auth.register(
      name,
      email,
      password,
      level
    );
    localStorage.setItem("Auth:user", JSON.stringify(userData));
    localStorage.setItem("Auth:token", token);
    api.defaults.headers.Authorization = `Bearer ${token}`;

    setUser(userData);
    setAuthenticated(true);
    history.push("/products");
  }
  function handleLogout() {
    setAuthenticated(false);
    localStorage.clear();
    api.defaults.headers.Authorization = undefined;
    history.push("/");
  }

  return {
    authenticated,
    loading,
    user,
    handleLogin,
    handleCreateUser,
    handleLogout,
  };
}
