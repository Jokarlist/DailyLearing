export default ({ name, data = {} }) => {
	const { isShowLoading } = data;
	isShowLoading === false && delete data.isShowLoading;
	
	return new Promise(async (resolve, reject) => {
		isShowLoading !== false && uni.showLoading({
			title: "加载中"
		});

		await uniCloud.callFunction({
				name,
				data
			})
			.then(({ result: { code, msg, data } }) => {
				isShowLoading !== false && uni.hideLoading();
				if (code === 0) {
					resolve(data);
				} else {
					uni.showToast({
						icon: "none",
						title: msg
					});
				}
			})
			.catch(err => {
				isShowLoading !== false && uni.hideLoading();
				reject(err)
			});
	});
}
