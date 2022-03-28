const fileds = {
  // 用于过滤路由记录数组的“顾客”过滤字段
  customer: ["Product", "ProductList", "ProductAdd"],
  // 用于过滤路由记录数组的“管理员”过滤字段
  admin: ["Product", "ProductList", "ProductAdd", "ProductCategory"],
};

/**
 * 按用户身份过滤掉其不需要的路由记录
 * @param {string} role 指示当前用户的身份
 * @param {array} routes 需要过滤的路由记录数组
 */
export default function routeFilter(role, routes) {
  return routes.filter((r) => {
    const route = r;
    if (route.children && route.children.length) {
      route.children = routeFilter(role, route.children);
    }

    return fileds[role].indexOf(route.name) > -1;
  });
}
