'use strict';
const db = uniCloud.database();
const dbCmd = db.command;

exports.main = async ({ authorId, userId }, context) => {
	const { data: [{ author_likes_ids: authorLikesIds }] } = await db.collection("user").doc(userId).get();
	let operation = null;
	let retMsg = "";
	if (authorLikesIds.includes(authorId)) {
		operation = dbCmd.pull(authorId);
		retMsg = "取消关注";
	} else {
		operation = dbCmd.addToSet(authorId);
		retMsg = "关注成功";
	}

	await db.collection("user").doc(userId).update({
		author_likes_ids: operation
	});

	return {
		code: 0,
		data: {
			msg: retMsg
		}
	}
};
