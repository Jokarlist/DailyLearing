'use strict';
const db = uniCloud.database();

exports.main = async ({ content, feedbackImageList, userId }, context) => {
	await db.collection("feedback").add({
		user_id: userId,
		feedback_image_list: feedbackImageList,
		content
	});

	return {
		code: 0,
		data: {
			msg: "提交反馈意见成功"
		}
	}
};
