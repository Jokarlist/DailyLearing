export default ({ name, data = {} }) => {
	return new Promise(async (resolve, reject) => {
		uni.showLoading();
		await uniCloud.callFunction({
			name,
			data
		}).then(({ result: { code, data } }) => {
			if (code === 0) {
				resolve(data);
			} else {
				uni.showToast({
					icon: "none",
					title: msg
				});
			}
		}).catch(err => reject(err));
		uni.hideLoading();
	});
}
