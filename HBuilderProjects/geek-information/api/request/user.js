import request from "../http.js";

// 获取 tabBar 栏的标签列表数据
export const userLogin = data => request({
	name: "userLogin",
	data
});