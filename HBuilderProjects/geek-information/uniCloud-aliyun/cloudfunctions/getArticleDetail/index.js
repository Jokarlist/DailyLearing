"use strict";
const db = uniCloud.database();

exports.main = async ({ articleId }, context) => {
	const { data: [articleDetail] } = await db
		.collection("article")
		.aggregate()
		.match({ _id: articleId })
		.end();

	return {
		code: 0,
		msg: "文章详情获取成功",
		data: articleDetail,
	};
};
