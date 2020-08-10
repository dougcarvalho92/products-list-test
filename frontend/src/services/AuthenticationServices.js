import api from "./api";

export const login = async (credentials) => {
  return await api.get("/login", { auth: credentials }).then((res) => res.data);
};
export const register = async (name, email, password, level) => {
  const data = { name, email, password, level };
  return await api.post("/register", data).then((res) => res.data);
};
