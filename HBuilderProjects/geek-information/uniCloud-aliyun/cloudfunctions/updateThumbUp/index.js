'use strict';
const db = uniCloud.database();
const dbCmd = db.command;

exports.main = async ({ articleId, userId }, context) => {
	const { data: [{ thumbs_up_article_ids: thumbsUpArticleIds }] } = await db.collection("user").doc(userId)
		.get();
	let operation = null;
	let retMsg = "";
	let thumbsUpCount = null;
	if (thumbsUpArticleIds.includes(articleId)) {
		operation = dbCmd.pull(articleId);
		thumbsUpCount = -1;
		retMsg = "取消点赞";
	} else {
		operation = dbCmd.addToSet(articleId);
		thumbsUpCount = 1;
		retMsg = "点赞成功";
	}

	await db.collection("user").doc(userId).update({
		thumbs_up_article_ids: operation
	});

	await db.collection("article").doc(articleId).update({
		thumbs_up_count: dbCmd.inc(thumbsUpCount)
	});

	return {
		code: 0,
		data: {
			msg: retMsg
		}
	}
};
