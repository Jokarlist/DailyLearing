<template>
	<view class="navbar-container">
		<view class="navbar-top">
			<view :style="{ height: `${mpStatusBarHeight}rpx` }"></view>
			<view class="navbar-search" :style="{ marginRight: `${mpMenuButtonWidth}rpx` }" @click="onNavBarSearchClick">
				<uni-icons class="navbar-serach-icon" type="search" color="#999" />
				<view class="navbar-search-text">输入文章标题进行搜索</view>
			</view>
		</view>
		<view class="navbar-pad" :style="{ height: `${mpStatusBarHeight + 80}rpx` }"></view>
	</view>
</template>

<script>
export default {
	name: "NavBar",
	data() {
		return {
			mpStatusBarHeight: 20,
			mpMenuButtonWidth: 0
		};
	},
	methods: {
		onNavBarSearchClick() {
			uni.navigateTo({
				url: "/pages/search/search"
			});
		}
	},
	created() {
		const { statusBarHeight } = uni.getSystemInfoSync();
		statusBarHeight && (this.mpStatusBarHeight = statusBarHeight * 2);

		// #ifdef MP-WEIXIN
		const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		this.mpStatusBarHeight = menuButtonInfo.top * 2;
		this.mpMenuButtonWidth = menuButtonInfo.width * 2;
		// #endif
	}
};
</script>

<style lang="scss" scoped>
.navbar-top {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	padding: 0 30rpx 20rpx;
	z-index: 99;
	background-color: $base-color;
	box-sizing: border-box;

	.navbar-search {
		@include flex(row, flex-start);
		height: 60rpx;
		padding-left: 20rpx;
		background-color: #fff;
		border-radius: 30rpx;
		flex-grow: 1;
		box-sizing: border-box;
	}

	.navbar-search-text {
		width: 100%;
		margin-left: 20rpx;
		font-size: 14px;
		color: #999;
	}
}
</style>
