import Home from "@/views/Home";
import News from "@/views/News";
import Login from "@/views/Login";
import User from "@/views/User";
import Loading from "@/views/Loading";

export default [
  { path: "/", component: Home },
  { path: "/loading", component: Loading },
  { path: "/login", component: Login },
  {
    path: "/news",
    component: News,
    meta: {
      auth: true,
    },
  },
  {
    path: "/user",
    component: User,
    meta: {
      auth: true,
    },
  },
];
