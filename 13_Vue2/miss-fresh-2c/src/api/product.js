import axiosIns from "./request";

/**
 * 获取类目列表信息
 * @param {object} params 发送请求传递的参数
 */
export async function getCategoryList(params) {
  return await axiosIns.get("/category/all", { params });
}

/**
 * 分页获取商品列表
 * @param {object} params 发送请求传递的参数
 */
export async function getProductList(params) {
  return await axiosIns.get("/products/all", { params });
}

/**
 * 删除单个商品
 * @param {string} id 需删除的商品的id
 */
export async function deleteProduct(id) {
  return await axiosIns.delete(`/products/${id}`);
}
