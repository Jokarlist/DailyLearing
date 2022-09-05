<template>
	<view class="comment-item-container">
		<view class="comment-header">
			<view class="comment-header-logo">
				<image :src="commentData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="comment-header-info">
				<view class="title" v-if="!commentData.is_reply">
					{{ commentData.author.author_name }}
				</view>
				<!-- 某用户对另一用户指定回复时，显示的指示消息 -->
				<view class="title" v-else>
					{{ commentData.author.author_name }} <text class="reply-text">回复</text>
					{{ commentData.target_user }}
				</view>
				<view class="date">
					<uni-dateformat :date="commentData.create_time" format="yyyy-MM-dd hh:mm:ss" />
				</view>
			</view>
		</view>
		<view class="comment-content">
			<view>{{ commentData.comment_content }}</view>
			<view class="comment-info">
				<view
					class="comment-button"
					@click="commentReply({ comment: { ...commentData }, isReply })"
				>
					回复
				</view>
			</view>
			<view
				class="comment-reply-list"
				v-for="item in commentData.reply_list"
				:key="item.comment_id"
			>
				<CommentItem :isReply="true" @comment-reply="commentReply" :comment-data="item" />
			</view>
		</view>
	</view>
</template>

<script>
import CommentItem from "@/components/CommentItem/CommentItem.vue";

export default {
	name: "CommentItem",
	components: {
		CommentItem,
	},
	props: {
		commentData: {
			type: Object,
			required: true,
		},
		// 区分是主回复还是子回复的标志
		isReply: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		commentReply(data) {
			if (data.isReply) {
				// 此时是子回复
				// reply_id 为想要进行子回复的评论的 comment_id
				data.comment.reply_id = data.comment.comment_id;
				// comment_id 为被进行子回复的评论所在的主评论的 comment_id
				data.comment.comment_id = this.commentData.comment_id;
			}

			this.$emit("comment-reply", data);
		},
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

				.reply-text {
					margin: 0 10px;
					font-weight: 700;
					color: #000;
				}
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

			.comment-button {
				padding: 4rpx 20rpx;
				font-size: 24rpx;
				color: #999;
				border-radius: 40rpx;
				border: 1px solid #ccc;
			}
		}

		.comment-reply-list {
			padding-left: 40rpx;
			border-bottom: 1px dashed $base-color;
			transform: scale(0.9);
		}
	}
}
</style>
