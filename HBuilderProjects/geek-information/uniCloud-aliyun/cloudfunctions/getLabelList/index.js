'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
	const label = db.collection("label");
	const data = (await label.get()).data.map(({ name, user }) => ({ name, user }));
	
	//返回数据给客户端
	return {
		msg: 0,
		labelList: data
	}
};
