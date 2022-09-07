import request from "../http.js";

// 获取 tabBar 栏的标签列表数据
export const userLogin = data => request({
	name: "userLogin",
	data
});

// 获取手机验证码进行登录
export const getVerificationCode = data => request({
	name: "getVerificationCode",
	data
});

// 更新用户关注信息
export const updateFollowAuthor = data => request({
	name: "updateFollowAuthor",
	data
});

// 更新文章点赞信息
export const updateThumbUp = data => request({
	name: "updateThumbUp",
	data
});

// 获取收藏的文章
export const getFollowArticle = data => request({
	name: "getFollowArticle",
	data
});

// 获取关注的作者
export const getFollowAuthor = data => request({
	name: "getFollowAuthor",
	data
});
