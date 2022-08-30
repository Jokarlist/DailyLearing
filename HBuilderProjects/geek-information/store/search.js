export default {
	namespaced: true,
	state: {
		searchHistory: uni.getStorageSync("searchHistory") || []
	},
	mutations: {
		setSearchHistory(state, val) {
			const list = state.searchHistory;
			if (list.length && list.includes(val)) return;
			list.unshift(val);
			state.searchHistory = list;
			uni.setStorageSync("searchHistory", list);
		},
		clearSearchHistory(state) {
			state.searchHistory = [];
			uni.removeStorageSync("searchHistory");
		}
	}
}
