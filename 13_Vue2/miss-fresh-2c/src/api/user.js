import axiosIns from "./request";

/**
 * 用户登录
 * @param {object} config 配置对象，包括email和password字段
 */
export async function login(config) {
  return await axiosIns.post("/passport/login", config);
}
