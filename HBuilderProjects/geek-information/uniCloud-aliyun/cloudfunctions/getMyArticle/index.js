'use strict';
const db = uniCloud.database();
const dbCmd = db.command;

exports.main = async ({ userId }, context) => {
	const { data: [{ article_ids: articleIds }] } = await db.collection("user").doc(userId).get();

	const { data: articleList } = await db.collection("article")
		.aggregate()
		.match({
			id: dbCmd.in(articleIds)
		})
		.project({
			content: false,
			comments: false
		})
		.end();

	return {
		code: 0,
		msg: "获取个人发布的文章成功",
		data: articleList
	};
};
