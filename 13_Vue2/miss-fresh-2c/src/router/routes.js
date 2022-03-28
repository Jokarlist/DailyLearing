import Home from "@/views/Home";
import Login from "@/views/Login";

export default [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [],
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About"),
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];
