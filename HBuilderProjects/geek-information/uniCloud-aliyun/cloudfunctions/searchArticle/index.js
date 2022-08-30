'use strict';
const db = uniCloud.database();

exports.main = async ({ searchVal }, context) => {
	const articleColl = db.collection("article");
	const { data: articleList } = await articleColl
		.aggregate()
		.match({
			title: new RegExp(searchVal)
		})
		.project({
			content: 0
		})
		.end();

	return {
		code: 0,
		msg: "搜索数据请求成功",
		data: {
			articleList
		}
	}
};
