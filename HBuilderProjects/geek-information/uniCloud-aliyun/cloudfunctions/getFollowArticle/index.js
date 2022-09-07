'use strict';
const db = uniCloud.database();

exports.main = async ({ userId }, context) => {
	const {
		data: [{
			article_likes_ids: articleLikesIds
		}]
	} = await db.collection("user").doc(userId).get();

	const {data: followList} = await db.collection("article")
		.aggregate()
		.addFields({
			is_like: db.command.aggregate.in(["$_id", articleLikesIds])
		})
		.project({
			content: 0
		})
		.match({
			is_like: true
		})
		.end();

	return {
		code: 0,
		msg: "请求收藏文章成功",
		data: followList
	};
};
