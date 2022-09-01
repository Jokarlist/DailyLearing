<template>
	<view class="article-detail-container">
		<!-- 标题 -->
		<view class="detail-title"> ssr基本介绍以及API的使用 </view>
		<!-- 头部 -->
		<view class="detail-header">
			<view class="detail-header-logo">
				<image src="../../static/img/logo.jpeg" mode="aspectFill"></image>
			</view>
			<view class="detail-header-content">
				<view class="detail-header-content-title">WEB讲师</view>
				<view class="detail-header-content-info">
					<text>2020.03.16 17:50</text> <text>173 浏览</text> <text>6 赞</text>
				</view>
			</view>
			<button class="detail-header-button" type="default">取消关注</button>
		</view>
		<!-- 内容 -->
		<view class="detail-content"> <view class="detail-text">文本内容</view> </view>
		<!-- 评论 -->
		<view class="detail-comment">
			<view class="detail-comment-input">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#f07373"></uni-icons>
			</view>
			<view class="detail-comment-icons">
				<view class="detail-comment-icon-box">
					<uni-icons type="chat" size="22" color="#f07373"></uni-icons>
				</view>
				<view class="detail-comment-icon-box">
					<uni-icons type="heart" size="22" color="#f07373"></uni-icons>
				</view>
				<view class="detail-comment-icon-box">
					<uni-icons type="hand-up" size="22" color="#f07373"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
};
</script>

<style lang="scss" scoped>
.article-detail-container {
	padding: 30rpx 0 108rpx;
}

.detail-title {
	padding: 0 30rpx;
	font-size: 36rpx;
	font-weight: bold;
}

.detail-header {
	@include flex(row, flex-start);
	margin-top: 20rpx;
	padding: 0 30rpx;

	.detail-header-logo {
		flex-shrink: 0;
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		overflow: hidden;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.detail-header-content {
		@include flex(column);
		width: 100%;
		padding-left: 20rpx;
		font-size: 24rpx;
		align-items: flex-start;

		.detail-header-content-title {
			font-size: 28rpx;
			color: #333;
		}

		.detail-header-content-info {
			color: #999;

			text {
				margin-right: 20rpx;
			}
		}
	}

	.detail-header-button {
		height: 60rpx;
		padding: 0 30rpx;
		line-height: 60rpx;
		font-size: 24rpx;
		color: #ffffff;
		border-radius: 10rpx;
		background-color: $base-color;
		flex-shrink: 0;
	}
}

.detail-content {
	margin-top: 40rpx;

	.detail-text {
		padding: 0 30rpx;
	}
}

.detail-comment {
	@include flex(row, flex-start);
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 88rpx;
	border-top: 1px #f5f5f5 solid;
	background-color: #fff;
	box-sizing: border-box;

	.detail-comment-input {
		@include flex();
		margin-left: 20rpx;
		padding: 0 20rpx;
		height: 60rpx;
		border: 1px solid #ddd;
		border-radius: 5px;
		flex-grow: 1;

		text {
			font-size: 28rpx;
			color: #999;
		}
	}

	.detail-comment-icons {
		display: flex;
		padding: 0 20rpx;
		flex-shrink: 0;

		.detail-comment-icon-box {
			@include flex(row, center);
			position: relative;
			width: 88rpx;
		}
	}
}
</style>
