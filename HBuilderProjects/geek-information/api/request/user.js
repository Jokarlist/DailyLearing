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

// 获取收藏文章列表
export const getFollowArticle = data => request({
	name: "getFollowArticle",
	data
});

// 获取关注作者列表
export const getFollowAuthor = data => request({
	name: "getFollowAuthor",
	data
});

// 获取我发布的文章
export const getMyArticle = data => request({
	name: "getMyArticle",
	data
});

// 用户反馈意见上传
export const updateFeedback = data => request({
	name: "updateFeedback",
	data
});

// 用户头像更改
export const updateUserAvater = data => request({
	name: "updateUserAvater",
	data
});
