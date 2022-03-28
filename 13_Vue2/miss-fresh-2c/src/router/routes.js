import Layout from "@/layout";
import Login from "@/views/Login";

export const appendRoutes = [
  {
    path: "/product",
    name: "Product",
    component: Layout,
    meta: { title: "商品" },
    children: [
      {
        path: "list",
        name: "ProductList",
        component: () => import("@/views/Product/productList"),
        meta: { title: "商品列表" },
      },
      {
        path: "add",
        name: "ProductAdd",
        component: () => import("@/views/Product/productAdd"),
        meta: { title: "新增商品" },
      },
      {
        path: "cate",
        name: "ProductCategory",
        component: () => import("@/views/Product/productCategory"),
        meta: { title: "类目管理" },
      },
    ],
  },
];

export const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { title: "登录" },
  },
  {
    path: "/",
    name: "Layout",
    component: Layout,
    meta: { title: "首页" },
    children: [
      {
        path: "stat",
        name: "Stat",
        component: () => import("@/views/Stat"),
        meta: { title: "统计" },
      },
    ],
  },
];
