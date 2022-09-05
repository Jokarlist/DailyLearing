'use strict';
const db = uniCloud.database();
const dbCmd = db.command;

exports.main = async ({ articleId, userId, content, comment_id = "", reply_id = "", is_reply = false }, context) => {
	console.log(reply_id);
	const { data: [user] } = await db.collection("user").doc(userId).get();
	const { data: [{ comments }] } = await db.collection("article").doc(articleId).get();
	const commentItem = {
		comment_id: generateId(5),
		comment_content: content,
		create_time: Date.now(),
		is_reply,
		reply_list: [],
		author: {
			author_id: user._id,
			author_name: user.author_name,
			avatar: user.avatar,
			professional: user.professional
		},
	};

	let operation = null;
	let comment
	if (!comment_id) {
		// 此时只是对文章进行评论
		commentItem.reply_list = [];
		operation = dbCmd.unshift(commentItem)
	} else {
		// 此时是对文章已有评论进行评论
		// 获取需要被评论的这条评论的索引与评论
		const targetCommentIdx = comments.findIndex(c => c.comment_id === comment_id);
		const targetComment = comments[targetCommentIdx];
		// 针对是主回复还是子回复做处理
		let targetUser = null;
		if (is_reply) {
			// 子回复
			targetUser = targetComment.reply_list.find(r => r.comment_id === reply_id).author.author_name;
		} else {
			// 主回复
			targetUser = targetComment.author.author_name;
		}

		commentItem.target_user = targetUser;
		operation = {
			[targetCommentIdx]: {
				reply_list: dbCmd.unshift(commentItem)
			}
		}
	}


	await db.collection("article").doc(articleId).update({
		comments: operation
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
