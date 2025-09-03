import apiClient from "../config/apiClient";
export const handleRegister = async (request) => {
  return await apiClient.post("/user/register", request);
};
export const handleLogin = async (request) => {
  return await apiClient.post("/user/login", request);
};
