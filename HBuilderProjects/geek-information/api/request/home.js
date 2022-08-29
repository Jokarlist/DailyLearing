import request from "../http.js";

// 获取 tabBar 栏的标签列表数据
export const getLabelList = data => request({
	name: "getLabelList",
	data
});

// 获取文章列表数据
export const getArticleList = data => request({
	name: "getArticleList",
	data
});

// 修改文章收藏状态
export const updateArticleFavorStatus = data => request({
	name: "updateArticleFavorStatus",
	data
});
