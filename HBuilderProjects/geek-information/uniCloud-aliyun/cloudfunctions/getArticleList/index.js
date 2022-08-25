'use strict';
const db = uniCloud.database();

exports.main = async ({ classify, pageNum = 1, pageSize = 10 }) => {
	const article = db.collection("article");
	const matchRule = {};
	classify !== "全部" && (matchRule["classify"] = classify);
	const { data: articleList } = await article
		.aggregate() // 使用聚合的方式获取数据
		.match(matchRule) // 根据匹配条件返回数据
		.project({
			content: 0 // 本次查询不需要返回文章详情给前端
		})
		.skip(pageSize * (pageNum - 1)) // 首页从 0 开始计算
		.limit(pageSize) // 每页最多返回的记录数
		.end();

	const { total } = await article
		.where(matchRule)
		.count();

	return {
		code: 0,
		msg: "数据获取成功",
		data: {
			articleList,
			total
		}
	}
};
