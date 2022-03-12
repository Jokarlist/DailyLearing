import request from "./request";

/**
 *  分页获取博客
 * @param {number} page 当前页码
 * @param {number} limit 页容量
 * @param {number} categoryid 所属分类，-1表示全部
 */
export async function getBlogs(page = 1, limit = 10, categoryid = -1) {
  return await request.get("/api/blog", {
    method: "GET",
    params: {
      page,
      limit,
      categoryid,
    },
  });
}

/**
 * 获取所有博客分类
 */
export async function getBlogCategories() {
  return await request.get("/api/blogtype");
}

/**
 * 获取单个博客
 * @param {number} id 博客的id
 */
export async function getBlog(id) {
  return await request.get(`/api/blog/${id}`);
}

/**
 * 提交评论
 * @param {object} commentInfo 评论信息对象
 */
export async function postComment(commentInfo) {
  return await request.post(`/api/comment`, commentInfo);
}

/**
 * 分页获取评论
 * @param {number} page 当前页码
 * @param {number} limit 页容量
 * @param {number} blogid 评论所属文章，-1表示不限
 */
export async function getComments(page = 1, limit = 10, blogid = -1) {
  return await request.get("/api/comment", {
    params: {
      page,
      limit,
      blogid,
    },
  });
}
