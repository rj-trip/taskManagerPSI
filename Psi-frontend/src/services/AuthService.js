// import axios from "../api/axios";

// const API_URL = "/auth";

// const login = async (data) => {
//   const res = await axios.post(`${API_URL}/login`, data);
//   localStorage.setItem("user", JSON.stringify(res.data));
//   return res.data;
// };

// const register = async (data) => {
//   const res = await axios.post(`${API_URL}/register`, data);
//   localStorage.setItem("user", JSON.stringify(res.data));
//   return res.data;
// };

// const logout = () => localStorage.removeItem("user");

// export default { login, register, logout };

import axios from "../api/axios";

const login = async (data) => {
  const res = await axios.post("/auth/login", data);
  localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};

const register = async (data) => {
  const res = await axios.post("/auth/register", data);
  localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

export default { login, register, logout };
