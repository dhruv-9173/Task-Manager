import apiClient from "../config/apiClient";
export const handlegetList = async () => {
  return await apiClient.get("/task");
};
export const handleaddTask = async (request) => {
  return await apiClient.post("/task", request);
};
export const deleteTask = async (request) => {
  return apiClient.delete(`/task/${request}`);
};
export const updateTask = async (request) => {
  return await apiClient.put("/task", request);
};
export const getTimeTable = async () => {
  return [];
};
