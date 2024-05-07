import { instance } from "../config/axios";
const createOrder = async (data) => {
  return instance.post(`http://localhost:8002/v1/create-order`, data);
};

export { createOrder };
