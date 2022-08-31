'use strict';
const db = uniCloud.database();

exports.main = async () => {
	const label = db.collection("label");
	const { data } = await label.get();

	return {
		code: 0,
		msg: "数据获取成功",
		data
	}
};
