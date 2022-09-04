'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
	const { username, password, phoneNum, type } = event;
	const user = await db.collection("user");
	const { data } = await user
		.aggregate()
		.match(type === "account" ? { username, password } : { phone_num: phoneNum })
		.end();
	//返回数据给客户端
	return data.length ? {
		code: 0,
		msg: "获取用户信息成功",
		data: data[0]
	} : {
		code: 1,
		msg: type === "account" ? "获取用户信息失败，请检查用户名或密码" : "验证码或电话号码输入错误"
	}
};
