import Brand from "../components/icon/Brand";
import Category from "../components/icon/Category";
import DashBoard from "../components/icon/DashBoard";
import Order from "../components/icon/Order";
import Product from "../components/icon/Product";
import SignOut from "../components/icon/SignOut";

export const menu = [
  {
    id: 1,
    title: "Dashboard",
    to: "/admin/manage/dashboard",
    icon: <DashBoard></DashBoard>,
  },
  {
    id: 2,
    title: "Products",
    to: "/admin/manage/product",
    icon: <Product></Product>,
  },
  {
    id: 3,
    title: "Brands",
    to: "/admin/manage/brand",
    icon: <Brand></Brand>,
  },
  {
    id: 4,
    title: "Categorys",
    to: "/admin/manage/category",
    icon: <Category></Category>,
  },
  {
    id: 5,
    title: "Orders",
    to: "/admin/manage/order",
    icon: <Order></Order>,
  },
  {
    id: 6,
    title: "Logout",
    to: "/logout",
    icon: <SignOut></SignOut>,
  },
];
