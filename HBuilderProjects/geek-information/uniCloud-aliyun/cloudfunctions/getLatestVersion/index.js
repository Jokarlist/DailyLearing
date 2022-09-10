'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
	const { data: [{ current_version }] } = await db.collection("version").get();

	return {
		code: 0,
		data: {
			version: current_version,
			downloadLink: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-2517cab3-8106-42c5-a94d-a5a2a8330191/b4f81e22-7ce5-4b03-8611-7bc4dd7c9bbc.apk"
		}
	};
};
