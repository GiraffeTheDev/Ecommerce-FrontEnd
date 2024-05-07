import { instance } from "../config/axios";
const register = async (data) => {
  return instance.post(`http://localhost:8002/v1/register-auth`, data);
};
const login = async (data) => {
  return instance.post(`http://localhost:8002/v1/login-auth`, data);
};
const logout = async () => {
  return instance.post(`http://localhost:8002/v1/logout-auth`);
};
export { login, logout, register };
