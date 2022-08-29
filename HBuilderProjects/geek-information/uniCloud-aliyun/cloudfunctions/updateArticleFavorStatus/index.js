'use strict';
const db = uniCloud.database();
const dbCmd = db.command;

exports.main = async ({ articleId, userId }, context) => {
	const userColl = db.collection("user");
	const { data: [{ article_likes_ids: articleLikesIds }] } = await userColl.doc(userId).get();
	let operation = null;
	let msg = null;
	// 若收藏的文章 ID 数组中有该文章 ID，则取消收藏，否则添加收藏
	if (articleLikesIds.includes(articleId)) {
		operation = dbCmd.pull(articleId);
		msg = "取消收藏成功";
	} else {
		operation = dbCmd.addToSet(articleId);
		msg = "添加收藏成功";
	}

	await userColl.doc(userId).update({
		article_likes_ids: operation,
	});

	const { data: [updatedUserInfo] } = await userColl.doc(userId).get();

	return {
		code: 0,
		data: {
			msg,
			updatedUserInfo
		}
	};
};
