import request from "./request";

/**
 * 提交留言
 */
export async function postMessage(messageInfo) {
  return await request.post("/api/message", messageInfo);
}

/**
 * 
 * @param {number} page 页码
 * @param {number} limit 页容量
 */
export async function getMessages(page = 1, limit = 10) {
  return await request.get("/api/message", {
    params: {
      page,
      limit,
    },
  });
}
