<template>
	<view class="article-list-container">
		<swiper class="swiper-container" :current="activeIdx" @change="onSwiperChange">
			<swiper-item v-for="(item, i) in labelList" :key="item.name">
				<view class="swiper-item"> <ListItem :article-list="articleListCache[i]" /> </view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
	name: "ArticleList",
	props: {
		labelList: {
			type: Array,
			default: () => [],
		},
		activeIdx: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			articleListCache: {},
		};
	},
	methods: {
		onSwiperChange({ detail: { current } }) {
			this.$emit("active-idx-change", current);
			if (!this.articleListCache[current] || !this.articleListCache[current].length) {
				this._getArticleList(current);
			}
		},
		async _getArticleList(curIdx) {
			const res = await this.$http.getArticleList({ classify: this.labelList[curIdx].name });
			// this.articleListCache[curIdx] = res;
			this.$set(this.articleListCache, curIdx, res);
		},
	},
	watch: {
		labelList(newVal, oldVal) {
			this._getArticleList(this.activeIdx);
		},
	},
};
</script>

<style lang="scss" scoped>
.swiper-container {
	height: 100%;
	// touch-action: none;

	.swiper-item {
		height: 100%;
		overflow: hidden;
	}
}
</style>
