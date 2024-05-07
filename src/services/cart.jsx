import { instance } from "../config/axios";
const addCart = async (data) => {
  return instance.post(`http://localhost:8002/v1/add-cart`, data);
};
const getCart = async (userId) => {
  return instance.get(`http://localhost:8002/v1/get-cart/${userId}`, userId);
};
const removeCart = async (id) => {
  return instance.delete(`http://localhost:8002/v1/remove-cart/${id}`, id);
};
const updateCart = async (data) => {
  return instance.put(`http://localhost:8002/v1/update-cart`, data);
};

export { addCart, getCart, removeCart, updateCart };
