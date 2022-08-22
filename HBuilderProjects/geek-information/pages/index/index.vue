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
		async _initLabelList() {
			const res = await this.$http.getLabelList();
			this.labelList = res;
		},
	},
};
</script>

<style scoped lang="scss">
.container {
	@include flex(row, space-around);
}
</style>
