import { getAsyncPage } from "../utils";

export default [
  { path: "/", component: getAsyncPage("../views/Home.vue") },
  { path: "/about", component: getAsyncPage("../views/About.vue") },
];
