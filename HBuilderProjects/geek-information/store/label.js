export default {
	namespaced: true,
	state: {
		labelList: uni.getStorageSync("labelList") || []
	},
	mutations: {
		setLabelList(state, labelList) {
			uni.setStorageSync("labelList", labelList);
			state.labelList = labelList;
		}
	}
}
