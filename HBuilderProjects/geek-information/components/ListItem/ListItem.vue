<template>
	<view class="list-item-container">
		<scroll-view scroll-y class="scroll-list" @scrolltolower="onScrollToLower">
			<view> <ListCard v-for="item in articleList" :key="item._id" :item="item" /> </view>
			<uni-load-more :status="loadData.loadStatus" v-if="isShowLoadMore" />
		</scroll-view>
	</view>
</template>

<script>
export default {
	name: "ListItem",
	props: {
		articleList: {
			type: Array,
			default: () => [],
		},
		loadData: {
			type: Object,
			default: () => ({ loadStatus: "loading" }),
		},
		isShowLoadMore: {
			type: Boolean,
			default: true,
		},
	},
	methods: {
		onScrollToLower() {
			this.$emit("load-more");
		},
	},
};
</script>

<style lang="scss" scoped>
.list-item-container {
	height: 100%;

	.scroll-list {
		height: 100%;
		overflow: hidden;
		box-sizing: border-box;
	}
}
</style>
