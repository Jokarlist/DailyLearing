'use strict';
const db = uniCloud.database();

exports.main = async ({ userId }, context) => {
	const {
		data: [{
			author_likes_ids: authorLikesIds
		}]
	} = await db.collection("user").doc(userId).get();

	const { data: authorList } = await db.collection("user")
		.aggregate()
		.addFields({
			is_follow: db.command.aggregate.in(["$id", authorLikesIds])
		})
		.match({
			is_follow: true
		})
		.project({
			password: false,
			username: false
		})
		.end();

	return {
		code: 0,
		msg: "获取关注作者成功",
		data: authorList
	}
};
