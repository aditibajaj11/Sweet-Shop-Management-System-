import axios from "axios";

const API_BASE = "process.env.REACT_APP_API_URL;";

const authHeaders = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const createSweet = async (data: {
  name: string;
  price: number;
  description?: string;
  category: string;
  quantity: number;
}, token: string) => {
  const res = await axios.post(`${API_BASE}/sweets`, data, authHeaders(token));
  return res.data;
};

export const getSweets = async (token: string) => {
  const res = await axios.get(`${API_BASE}/sweets`, authHeaders(token));
  return res.data;
};

export const updateSweet = async (
  id: string,
  data: Partial<{
    name: string;
    price: number;
    description: string;
    category: string;
    quantity: number;
  }>,
  token: string
) => {
  const res = await axios.put(`${API_BASE}/sweets/${id}`, data, authHeaders(token));
  return res.data;
};

export const deleteSweet = async (id: string, token: string) => {
  const res = await axios.delete(`${API_BASE}/sweets/${id}`, authHeaders(token));
  return res.data;
};

export const purchaseSweet = async (id: string, quantity: number, token: string) => {
  const res = await axios.post(
    `${API_BASE}/sweets/${id}/purchase`,
    { quantity },
    authHeaders(token)
  );
  return res.data;
};

export const restockSweet = async (id: string, quantity: number, token: string) => {
  const res = await axios.post(
    `${API_BASE}/sweets/${id}/restock`,
    { quantity },
    authHeaders(token)
  );
  return res.data;
};

export const checkStock = async (id: string, token: string) => {
  const res = await axios.get(`${API_BASE}/sweets/${id}/stock`, authHeaders(token));
  return res.data;
};