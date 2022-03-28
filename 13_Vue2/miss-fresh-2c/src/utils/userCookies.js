import Cookies from "js-cookie";

/**
 * 按照配置设置用户信息cookies
 * @param {object} config 登录时传递进来的用户信息对象
 */
export function setUserCookies(config) {
  Object.entries(config).forEach(([k, v]) => Cookies.set(k, v, { expires: 3 }));

  return true;
}

/**
 * 获取用户信息cookies
 */
export function getUserCookies() {
  return {
    appkey: Cookies.get("appkey"),
    username: Cookies.get("username"),
    role: Cookies.get("role"),
    email: Cookies.get("email"),
  };
}

/**
 * 删除用户信息cookies
 */
export function removeUserCookies() {
  Cookies.remove("username");
  Cookies.remove("appkey");
  Cookies.remove("role");
  Cookies.remove("email");

  return true;
}
