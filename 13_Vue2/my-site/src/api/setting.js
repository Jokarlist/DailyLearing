import request from "./request";

/**
 * 获取全局设置
 */
export async function getSettings() {
  return await request.get("/api/setting");
}