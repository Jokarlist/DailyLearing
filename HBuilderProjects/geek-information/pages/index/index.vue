<template>
	<view class="home-container">
		<NavBar />
		<TabBar
			:label-list="labelList"
			:active-idx="activeIdx"
			@active-idx-change="onActiveIdxChange"
		/>
		<ArticleList
			:label-list-length="labelList.length"
			:active-idx="activeIdx"
			@active-idx-change="onActiveIdxChange"
		/>
	</view>
</template>

<script>
export default {
	data() {
		return {
			labelList: [],
			activeIdx: 0,
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
		onActiveIdxChange(idx) {
			this.activeIdx = idx;
		},
	},
};
</script>

<style scoped lang="scss">
page {
	height: 100%;

	.home-container {
		@include flex(column, flex-start);
		height: 100%;
		overflow: hidden;
		box-sizing: border-box;

		.article-list-container {
			flex: 1;
			width: 100%;
		}
	}
}
</style>
