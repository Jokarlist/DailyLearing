import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/Login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/Dashboard/index"),
        meta: { title: "控制台", icon: "dashboard" },
      },
    ],
  },

  {
    path: "/banner",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Banner",
        component: () => import("@/views/Banner/index"),
        meta: { title: "首页标语", icon: "el-icon-s-home" },
      },
    ],
  },

  {
    path: "/blog",
    component: Layout,
    redirect: "/blog/blog-list",
    name: "Blog",
    meta: { title: "文章管理", icon: "el-icon-document" },
    children: [
      {
        path: "blog-list",
        name: "BlogList",
        component: () => import("@/views/Blog/BlogList/index"),
        meta: { title: "文章列表", icon: "el-icon-s-order" },
      },
      {
        path: "blog-category",
        name: "BlogCategory",
        component: () => import("@/views/Blog/BlogCategory/index"),
        meta: { title: "文章分类", icon: "el-icon-menu" },
      },
    ],
  },

  {
    path: "/project",
    component: Layout,
    redirect: "/project/project-list",
    name: "Project",
    meta: { title: "项目管理", icon: "el-icon-suitcase" },
    children: [
      {
        path: "project-list",
        name: "ProjectList",
        component: () => import("@/views/Project/ProjectList/index"),
        meta: { title: "项目列表", icon: "el-icon-notebook-1" },
      },
      {
        path: "add-project",
        name: "AddProject",
        component: () => import("@/views/Project/AddProject/index"),
        meta: { title: "添加项目", icon: "el-icon-link" },
      },
    ],
  },

  {
    path: "/comment",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Comment",
        component: () => import("@/views/Comment/index"),
        meta: { title: "评论管理", icon: "el-icon-chat-line-round" },
      },
    ],
  },

  {
    path: "/message",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Message",
        component: () => import("@/views/Message/index"),
        meta: { title: "留言板", icon: "el-icon-copy-document" },
      },
    ],
  },

  {
    path: "/About",
    component: Layout,
    children: [
      {
        path: "index",
        name: "About",
        component: () => import("@/views/About/index"),
        meta: { title: "关于我", icon: "el-icon-s-custom" },
      },
    ],
  },

  {
    path: "/Setting",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Setting",
        component: () => import("@/views/Setting/index"),
        meta: { title: "设置", icon: "el-icon-s-tools" },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
