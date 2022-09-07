<template>
	<view class="home-container">
		<NavBar />
		<TabBar
			:label-list="labelList"
			:active-idx="activeIdx"
			@active-idx-change="onActiveIdxChange"
		/>
		<ArticleList
			class="article-list"
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
	computed: {
		labelList() {
			const labelList = this.$store.state.label.labelList;
			if (this.userInfo) {
				this.activeIdx = 0;
				return [
					...labelList.slice(0, 1),
					...labelList.filter(l => this.userInfo.label_ids.includes(l._id)),
				];
			} else {
				return labelList;
			}
		},
		// ...mapState("label", ["labelList"]),
	},
	methods: {
		...mapMutations("label", ["setLabelList"]),
		async _initLabelList() {
			if (this.labelList.length) return;
			const labelList = await this.$http.getLabelList();
			this.setLabelList([{ name: "全部" }, ...labelList]);
		},
		onActiveIdxChange(idx) {
			this.activeIdx = idx;
		},
	},
};
</script>

<style scoped lang="scss">
.home-container {
	@include flex(column, flex-start);
	height: 100%;
	overflow: hidden;
	box-sizing: border-box;

	.article-list {
		flex: 1;
		width: 100%;
	}
}
</style>
