'use strict';
const db = uniCloud.database();
const dbCmd = db.command;

exports.main = async ({ userId, filePath }, context) => {
	const { data: [{ avatar, id }] } = await db.collection("user").doc(userId).get();
	try {
		await uniCloud.deleteFile({
			fileList: [avatar]
		});
	} catch (e) {
		console.log(e);
	}

	await db.collection("article")
		.where({
			"author.id": id
		})
		.update({
			"author.avatar": filePath
		});

	await db.collection("user").doc(userId).update({
		avatar: filePath
	});

	return {
		code: 0,
		data: {
			msg: "修改用户头像成功"
		}
	}
};
