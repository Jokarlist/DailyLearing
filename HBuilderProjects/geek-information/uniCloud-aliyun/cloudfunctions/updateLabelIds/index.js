'use strict';
const db = uniCloud.database();

exports.main = async ({ userId, labelIds }, context) => {
	await db.collection("user").doc(userId).update({ label_ids: labelIds });

	return {
		code: 0,
		data: {
			msg: "保存成功"
		}
	};
};
