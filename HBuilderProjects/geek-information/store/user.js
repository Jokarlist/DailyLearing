export default {
	namespaced: true,
	state: {
		userInfo: uni.getStorageSync("userInfo") || null
	},
	mutations: {
		setUserInfo(state, userInfo) {
			uni.setStorageSync("userInfo", userInfo);
			state.userInfo = userInfo;
		}
	}
}
