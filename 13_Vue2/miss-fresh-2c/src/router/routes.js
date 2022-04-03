import Layout from "@/layout";
import Login from "@/views/Login";

export const appendRoutes = [
  {
    path: "/product",
    name: "Product",
    component: Layout,
    meta: { title: "商品", hidden: false, icon: "shop" },
    children: [
      {
        path: "list",
        name: "ProductList",
        component: () => import("@/views/Product/productList"),
        meta: { title: "商品列表", hidden: false, icon: "tags" },
      },
      {
        path: "add",
        name: "ProductAdd",
        component: () => import("@/views/Product/productAdd"),
        meta: { title: "新增商品", hidden: false, icon: "tag" },
      },
      {
        path: "cate",
        name: "ProductCategory",
        component: () => import("@/views/Product/productCategory"),
        meta: { title: "类目管理", hidden: false, icon: "apartment" },
      },
    ],
  },
];

export const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { title: "登录", hidden: true },
  },
  {
    path: "/",
    name: "Layout",
    component: Layout,
    meta: { title: "首页", hidden: false, icon: "home" },
    children: [
      {
        path: "stat",
        name: "Stat",
        component: () => import("@/views/Stat"),
        meta: { title: "统计", hidden: false, icon: "calculator" },
      },
    ],
  },
];
