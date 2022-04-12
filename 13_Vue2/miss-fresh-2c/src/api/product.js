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

/**
 * 新增单个产品
 * @param {object} params 发送请求传递的参数
 */
export async function addProduct(params) {
  return await axiosIns.post("/products/add", params);
}

/**
 * 获取商品详情
 * @param {string} id 需查询的商品的id
 */
export async function getProductDetail(id) {
  return await axiosIns.get(`/products/${id}`);
}

/**
 * 编辑单个商品
 * @param {object} params 发送请求传递的参数
 */
export async function editProduct(params) {
  return await axiosIns.put("/products/edit", params);
}