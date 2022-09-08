'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
	const { data: [{ current_version }] } = await db.collection("version").get();

	return {
		code: 0,
		data: {
			version: current_version,
			downloadLink: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-c1da2723-930f-4455-86c1-df51096d1e3e/caee9db5-1291-499b-bf51-fc5bfb95a38e.apk"
		}
	};
};
