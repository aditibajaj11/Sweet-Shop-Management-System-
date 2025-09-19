import axios from "axios";

const API_BASE = "http://localhost:5000/api"; 

export const registerUser = async (data: { name: string; email: string; password: string }) => {
  const response = await axios.post(`${API_BASE}/auth/register`, data);
  return response.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await axios.post(`${API_BASE}/auth/login`, data);
  return response.data;
};
