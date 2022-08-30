<template>
	<view class="navbar-container">
		<view class="navbar-top">
			<!-- 因为小程序顶栏有移动设备的状态栏，所以设置一个垫片隔开相应高度 -->
			<view :style="{ height: `${mpStatusBarHeight}rpx` }"></view>
			<!-- 父页面为搜索页，添加返回按钮 -->
			<view
				@click="goBackArticlePage"
				:style="{ top: `${mpStatusBarHeight}rpx` }"
				class="go-back-btn"
				v-if="isSearch"
			>
				<uni-icons type="back" size="22" color="#fff" />
			</view>
			<!-- 搜索框 -->
			<view
				class="navbar-search"
				:style="{ marginRight: `${mpMenuButtonWidth}rpx`, marginLeft: isSearch ? '20rpx' : '' }"
				@click="go2SearchPage"
			>
				<uni-icons class="navbar-serach-icon" type="search" color="#999" />
				<!-- 文章页的搜索框处理 -->
				<view class="navbar-search-text" v-if="!isSearch">输入文章标题进行搜索</view>
				<!-- 搜索页的搜索框处理 -->
				<input type="text" placeholder="输入文章标题进行搜索" class="navbar-search-input" v-else />
			</view>
		</view>
		<!-- 底部垫片 -->
		<view class="navbar-pad" :style="{ height: `${mpStatusBarHeight + 80}rpx` }"></view>
	</view>
</template>

<script>
export default {
	name: "NavBar",
	props: {
		isSearch: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			mpStatusBarHeight: 20,
			mpMenuButtonWidth: 0,
		};
	},
	methods: {
		go2SearchPage() {
			if (this.isSearch) return;
			uni.navigateTo({
				url: "/pages/search/search",
			});
		},
		goBackArticlePage() {
			// #ifdef H5
			uni.switchTab({
				url: "/pages/index/index",
			});
			// #endif

			// #ifndef H5
			uni.navigateBack();
			// #endif
		},
	},
	created() {
		const { statusBarHeight } = uni.getSystemInfoSync();
		statusBarHeight && (this.mpStatusBarHeight = statusBarHeight * 2);

		// #ifdef MP-WEIXIN
		const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		this.mpStatusBarHeight = menuButtonInfo.top * 2;
		this.mpMenuButtonWidth = menuButtonInfo.width * 2;
		// #endif
	},
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

	.go-back-btn {
		position: absolute;
		left: 0;
		top: 50%;
		height: 60rpx;
		@include flex(row, center);
	}

	.navbar-search-input {
		width: 100%;
		font-size: 28rpx;
		color: #999;
		text-indent: 20rpx;
	}
}
</style>
