<template>
	<view class="comment-item-container">
		<view class="comment-header">
			<view class="comment-header-logo">
				<image :src="commentData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="comment-header-info">
				<view class="title">{{commentData.author.author_name}}</view>
				<view class="date">
					<uni-dateformat :date="commentData.create_time" format="yyyy-MM-dd hh:mm:ss" />
				</view>
			</view>
		</view>
		<view class="comment-content">
			<view>{{commentData.comment_content}}</view>
			<view class="comment-info"> <view class="comment-button">回复</view> </view>
		</view>
	</view>
</template>

<script>
export default {
	name: "CommentItem",
	props: {
		commentData: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {};
	},
};
</script>

<style lang="scss" scoped>
.comment-item-container {
	margin: 30rpx 0;

	.comment-header {
		@include flex(row, flex-start, flex-start);

		.comment-header-logo {
			width: 80rpx;
			height: 80rpx;
			border-radius: 10rpx;
			overflow: hidden;
			flex-shrink: 0;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.comment-header-info {
			@include flex(column, flex-start, flex-start);
			padding-left: 30rpx;
			font-size: 24rpx;
			color: #999;
			line-height: 1;

			.title {
				margin-bottom: 20rpx;
				font-size: 28rpx;
				color: #333;
			}
		}
	}

	.comment-content {
		margin-top: 20rpx;
		font-size: 28rpx;
		color: #000;

		.comment-info {
			margin-top: 30rpx;
			display: flex;
		}

		.comment-button {
			padding: 4rpx 20rpx;
			font-size: 24rpx;
			color: #999;
			border-radius: 40rpx;
			border: 1px solid #ccc;
		}
	}
}
</style>
