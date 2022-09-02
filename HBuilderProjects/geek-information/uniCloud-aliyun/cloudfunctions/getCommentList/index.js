'use strict';
const db = uniCloud.database();

exports.main = async ({ articleId, pageSize = 10, pageNum = 1 }, context) => {
	const { data: commentList } = await db.collection("article")
		.aggregate()
		.match({
			_id: articleId
		})
		.unwind("$comments")
		.project({
			_id: 0,
			comments: 1
		})
		.replaceRoot({
			newRoot: "$comments"
		})
		.skip(pageSize * (pageNum - 1))
		.limit(pageSize)
		.end();

	return {
		code: 0,
		msg: "获取评论成功",
		data: commentList
	}
};
