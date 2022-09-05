"use strict";
const db = uniCloud.database();

exports.main = async ({ articleId }, context) => {
	await db.collection("article").doc(articleId).update({
		browse_count: db.command.inc(1)
	});
	
	const { data: [articleDetail] } = await db
		.collection("article")
		.aggregate()
		.match({ _id: articleId })
		.project({ comments: 0 })
		.end();

	return {
		code: 0,
		msg: "文章详情获取成功",
		data: articleDetail,
	};
};
