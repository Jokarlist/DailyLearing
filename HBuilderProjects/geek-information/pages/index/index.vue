<template>
	<view class="home-container">
		<NavBar />
		<TabBar
			:label-list="labelList"
			:active-idx="activeIdx"
			@active-idx-change="onActiveIdxChange"
		/>
		<ArticleList
			:label-list="labelList"
			:active-idx="activeIdx"
			@active-idx-change="onActiveIdxChange"
		/>
	</view>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
	data() {
		return {
			activeIdx: 0,
		};
	},
	onLoad() {
		this._initLabelList();
	},
	computed: mapState("label", ["labelList"]),
	methods: {
		...mapMutations("label", ["setLabelList"]),
		async _initLabelList() {
			if (this.labelList.length) return;
			const res = await this.$http.getLabelList();
			this.setLabelList([{ name: "全部" }, ...res]);
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
