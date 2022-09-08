import request from "../http.js";

// 获取 APP 安卓端最新版本
export const getLatestVersion = data => request({
	name: "getLatestVersion",
	data
});
