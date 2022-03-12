import request from "./request";

/**
 * 获取所有项目
 */
export async function getProjects() {
  return await request.get("/api/project");
}
