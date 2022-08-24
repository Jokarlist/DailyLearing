'use strict';
const db = uniCloud.database();

exports.main = async ({ classify }) => {
	const article = db.collection("article");
	const matchRule = {};
	classify !== "全部" && (matchRule["classify"] = classify);
	const data = (await article.aggregate().match(matchRule).project({ content: 0 }).end()).data;

	return {
		code: 0,
		msg: "数据获取成功",
		data
	}
};
