export default ({ name, data = {} }) => {
	return new Promise(async (resolve, reject) => {
		uni.showLoading();
		await uniCloud.callFunction({
			name,
			data
		}).then(({ result: { code, msg, data } }) => {
			uni.hideLoading();
			if (code === 0) {
				resolve(data);
			} else {
				uni.showToast({
					icon: "none",
					title: msg
				});
			}
		}).catch(err => {
			uni.hideLoading();
			reject(err)
		});
	});
}
