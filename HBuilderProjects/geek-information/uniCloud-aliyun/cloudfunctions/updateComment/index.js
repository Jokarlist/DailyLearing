'use strict';
const db = uniCloud.database();
const dbCmd = db.command;

exports.main = async ({ articleId, userId, content }, context) => {
	const { data: [user] } = await db.collection("user").doc(userId).get();
	const commentItem = {
		comment_id: generateId(5),
		comment_content: content,
		create_time: Date.now(),
		is_reply: false,
		author: {
			author_id: user._id,
			author_name: user.author_name,
			avatar: user.avatar,
			professional: user.professional
		},
		replyArr: []
	};

	await db.collection("article").doc(articleId).update({
		comments: dbCmd.unshift(commentItem)
	});

	return {
		code: 0,
		data: {
			msg: "评论成功"
		}
	}
};

const generateId = (num) => {
	return Number(Math.random().toString().substring(2, 2 + num) + Date.now()).toString(36);
}
