<template>
	<view class="my-article-container">
		<ListCard v-for="item in articleList" :key="item._id" :item="item" />
		<view class="no-data" v-if="!articleList.length">您还没有发布过任何文章</view>
	</view>
</template>

<script>
export default {
	onLoad() {
		this._getMyArticle();
	},
	data() {
		return {
			articleList: [],
		};
	},
	methods: {
		async _getMyArticle() {
			const articleList = await this.$http.getMyArticle({
				userId: this.userInfo._id,
			});

			this.articleList = articleList;
		},
	},
};
</script>

<style lang="scss" scoped>
.no-data {
	height: 400rpx;
	width: 100%;
	line-height: 400rpx;
	text-align: center;
	font-size: 28rpx;
	color: #666;
}
</style>
