import Cookies from "js-cookie";
const accessTokenKey = "access_token";
const refreshTokenKey = "refresh_token";
export const getToken = () => {
  const access_token = Cookies.get(accessTokenKey);
  const refresh_token = Cookies.get(refreshTokenKey);
  return {
    access_token,
    refresh_token,
  };
};
