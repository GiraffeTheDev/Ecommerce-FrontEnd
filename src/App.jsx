import { Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import LayoutAdmin from "./layout/LayoutAdmin";
import LayoutHome from "./layout/LayoutHome";
import LayoutSignPage from "./layout/LayoutSignPage";
import ProductManage from "./module/admin/products/ProductManage";
import CartPage from "./pages/CartPage";
import CheckOut from "./pages/CheckOut";
import HomePage from "./pages/HomePage";
import Logout from "./pages/Logout";
import Page404 from "./pages/Page404";
import ProductDetailPage from "./pages/ProductDetailPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { fetchProtectedData, refreshAccessToken } from "./services/token";
import { handleLogout } from "./store/auth/handlers";
import { getToken } from "./utils/auth";

function App() {
  const { access_token, refresh_token } = getToken();
  const navigate = useNavigate();
  const [protectedData, setProtectedData] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProtectedData(access_token);
        setProtectedData(data.message);
      } catch (error) {
        if (error.response.status === 403) {
          // Nếu AccessToken hết hạn, thử làm mới AccessToken và gọi lại API
          try {
            const newAccessToken = await refreshAccessToken(refresh_token);

            // dispatch(handleLogin({ access_token: newAccessToken }));
            const newData = await fetchProtectedData(newAccessToken);

            setProtectedData(newData.message);
          } catch (refreshError) {
            dispatch(handleLogout());
            navigate("/sign-in");
            console.error("Error refreshing access token:", refreshError);
          }
        } else {
          console.error("Error fetching protected data:", error);
        }
      }
    };

    fetchData();
  }, [access_token, refresh_token, dispatch, navigate]);

  return (
    <>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<LayoutSignPage></LayoutSignPage>}>
            <Route element={<SignInPage></SignInPage>} path="/sign-in"></Route>
            <Route element={<SignUpPage></SignUpPage>} path="/sign-up"></Route>
          </Route>
          <Route element={<LayoutHome></LayoutHome>}>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/cart" element={<CartPage></CartPage>}></Route>
            <Route path="/checkout" element={<CheckOut></CheckOut>}></Route>
            <Route
              path="/product-detail"
              element={<ProductDetailPage></ProductDetailPage>}
            ></Route>
            <Route path="/logout" element={<Logout></Logout>}></Route>
          </Route>
          <Route path="/admin" element={<LayoutAdmin></LayoutAdmin>}>
            <Route
              path="/admin/manage-product"
              element={<ProductManage></ProductManage>}
            ></Route>
          </Route>
          <Route path="*" element={<Page404></Page404>}></Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
