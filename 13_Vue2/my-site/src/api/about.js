import request from "./request";

/**
 * 获取关于我页面
 */
export async function getAbout() {
  return await request.get("/api/about");
}
