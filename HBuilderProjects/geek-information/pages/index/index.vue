<template>
	<view class="home-container">
		<NavBar />
		<TabBar :labelList="labelList" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			labelList: [],
		};
	},
	onLoad() {
		this._initLabelList();
	},
	methods: {
		_initLabelList() {
			uniCloud
				.callFunction({
					name: "getLabelList",
				})
				.then(({ result: { labelList } }) => (this.labelList = labelList));
		},
	},
};
</script>

<style scoped lang="scss">
.container {
	@include flex(row, space-around);
}
</style>
