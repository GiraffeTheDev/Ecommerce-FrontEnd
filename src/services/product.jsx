import { instance } from "../config/axios";
const getAllProducts = async () => {
  return instance.get(`http://localhost:8002/v1/products`);
};
const getAProduct = async (id) => {
  return instance.get(`http://localhost:8002/v1/product/${id}`, id);
};
const searchProduct = async (query) => {
  return instance.get(`http://localhost:8002/v1/search?search=${query}`, query);
};
const deleteProduct = async (id) => {
  return instance.delete(`http://localhost:8002/v1/product/${id}`, id);
};
export { deleteProduct, getAProduct, getAllProducts, searchProduct };
