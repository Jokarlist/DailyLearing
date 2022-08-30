<template>
	<view class="search-container">
		<!-- 搜索导航组件 -->
		<NavBar :is-search="true" />
		<!-- 搜索区域 -->
		<view class="search-area">
			<!-- 没有进行搜索的操作 -->
			<view v-if="true" class="search-history-container">
				<!-- 头部 -->
				<view class="search-history-header">
					<text class="history-text">搜索历史</text> <text class="history-clear">清空</text>
				</view>
				<!-- 内容 -->
				<view class="search-history-content">
					<view class="history-content-item" v-for="item in 10" :key="item">直播</view>
				</view>

				<view class="no-data">当前没有搜索历史</view>
			</view>
			<!-- 开始进行搜索的操作 -->
			<view v-else class="search-list-container">
				<ListItem v-if="searchList.length" />
				<view class="no-data">没有搜索到相关数据</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			searchList: [],
		};
	},
};
</script>

<style lang="scss">
page {
	height: 100%;
	background-color: #f5f5f5;

	.search-container {
		width: 100%;
		display: flex;
		flex-direction: column;

		.search-area {
			background-color: #fff;
			margin-bottom: 20rpx;

			.search-history-header {
				@include flex();
				padding: 20rpx 30rpx;
				font-size: 28rpx;
				color: #666;
				border-bottom: 1px solid #f5f5f5;

				.history-text {
					color: $base-color;
				}

				.history-clear {
					color: #30b33a;
					font-weight: bold;
				}
			}

			.search-history-content {
				@include flex(row, flex-start, center, wrap);
				padding: 30rpx;
				padding-top: 0;

				.history-content-item {
					padding: 4rpx 20rpx;
					margin-top: 24rpx;
					margin-right: 20rpx;
					font-size: 28rpx;
					color: #666;
					border-radius: 10rpx;
					border: 1px solid #666;
				}
			}

			.no-data {
				height: 400rpx;
				width: 100%;
				line-height: 400rpx;
				text-align: center;
				font-size: 24rpx;
				color: #666;
			}
		}
	}
}
</style>
