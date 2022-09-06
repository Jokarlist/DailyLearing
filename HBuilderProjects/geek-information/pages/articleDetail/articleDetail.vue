<template>
	<view class="article-detail-container">
		<!-- 标题 -->
		<view class="detail-title"> {{ articleDetail.title }} </view>
		<!-- 头部 -->
		<view class="detail-header">
			<view class="detail-header-logo">
				<image :src="articleDetail.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="detail-header-content">
				<view class="detail-header-content-title">{{ articleDetail.author.author_name }}</view>
				<view class="detail-header-content-info">
					<text>{{ articleDetail.create_time }}</text>
					<text>{{ articleDetail.browse_count }} 浏览</text>
					<text>{{ articleDetail.thumbs_up_count }} 赞</text>
				</view>
			</view>
			<button class="detail-header-button" type="default" @click="_followAuthor">
				{{ isFollowAuthor ? "取消关注" : "关注" }}
			</button>
		</view>
		<!-- 内容 -->
		<view class="detail-content">
			<view class="detail-text"> <uParse :content="content" /> </view>
			<!-- 评论展示 -->
			<view class="detail-comment-area">
				<view class="comment-title">最新评论</view>
				<view class="comment-content-container" v-for="item in commentList" :key="item.comment_id">
					<CommentItem :comment-data="item" @comment-reply="commentReply" />
				</view>
				<view class="no-data" v-if="!commentList.length">暂无评论</view>
			</view>
		</view>
		<!-- 评论书写 -->
		<view class="detail-comment">
			<view class="detail-comment-input" @click="startComment">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#f07373"></uni-icons>
			</view>
			<view class="detail-comment-icons">
				<view class="detail-comment-icon-box">
					<uni-icons type="chat" size="22" color="#f07373" @click="go2CommentListPage"></uni-icons>
				</view>
				<Favor class="detail-comment-icon-box" :article-id="articleDetail._id" size="22" />
				<view class="detail-comment-icon-box">
					<uni-icons
						:type="isThumbUp ? 'hand-up-filled' : 'hand-up'"
						size="22"
						color="#f07373"
						@click="_updateThumbUp"
					></uni-icons>
				</view>
			</view>
		</view>
		<CommentMask
			:show-popup="showPopup"
			@close-comment-mask="showPopup = $event"
			@publish-comment="_publishComment"
		/>
	</view>
</template>

<script>
import uParse from "@/components/u-parse/u-parse.vue";
import { marked } from "marked";

export default {
	components: {
		uParse,
	},
	onLoad(options) {
		this.articleDetail = this.$Router.currentRoute.query.basicInfo;
		// this.articleDetail = JSON.parse(options.basicInfo);
		this._getArticleDetail();
		this._getCommentList();
	},
	data() {
		return {
			articleDetail: null,
			showPopup: false,
			commentList: [],
			replyData: {},
		};
	},
	methods: {
		async _getArticleDetail() {
			this.articleDetail = await this.$http.getArticleDetail({
				articleId: this.articleDetail._id,
			});
		},
		async startComment() {
			try {
				await this.checkLoginStatus();
				this.showPopup = true;
			} catch (e) {
				console.log("未登录，请先登录");
			}
		},
		async _publishComment(commentValue) {
			const { msg } = await this.$http.updateComment({
				articleId: this.articleDetail._id,
				userId: this.userInfo._id,
				content: commentValue,
				...this.replyData, // 若当前为对指定评论回复则 replyData 有值
			});

			uni.showToast({
				title: msg,
			});

			this.showPopup = false;
			this._getCommentList();
			this.replyData = {};
		},
		async _getCommentList() {
			const commentList = await this.$http.getCommentList({
				articleId: this.articleDetail._id,
			});

			this.commentList = commentList;
		},
		commentReply({ comment, isReply }) {
			this.replyData = {
				comment_id: comment.comment_id,
				is_reply: isReply,
				// 如果是某用户间的指定回复
				reply_id: comment.reply_id ? comment.reply_id : "",
			};

			this.startComment();
		},
		async _followAuthor() {
			try {
				await this.checkLoginStatus();
				const { msg } = await this.$http.updateFollowAuthor({
					authorId: this.articleDetail.author.id,
					userId: this.userInfo._id,
				});

				uni.showToast({
					title: msg,
					icon: "none",
				});

				const targetAuthorId = this.articleDetail.author.id;
				let authorLikesIds = [...this.userInfo.author_likes_ids];
				if (authorLikesIds.includes(targetAuthorId)) {
					authorLikesIds = authorLikesIds.filter(id => !id === targetAuthorId);
				} else {
					authorLikesIds.push(targetAuthorId);
				}

				this.setUserInfo({ ...this.userInfo, author_likes_ids: authorLikesIds });
			} catch (e) {
				console.log("未登录，请先登录");
			}
		},
		async _updateThumbUp() {
			try {
				await this.checkLoginStatus();
				const { msg } = await this.$http.updateThumbUp({
					articleId: this.articleDetail._id,
					userId: this.userInfo._id,
				});

				uni.showToast({
					title: msg,
					icon: "none",
				});

				const targetArticleId = this.articleDetail._id;
				let thumbsUpArticleIds = [...this.userInfo.thumbs_up_article_ids];
				if (thumbsUpArticleIds.includes(targetArticleId)) {
					thumbsUpArticleIds = thumbsUpArticleIds.filter(id => !id === targetArticleId);
					this.articleDetail.thumbs_up_count--;
				} else {
					thumbsUpArticleIds.push(targetArticleId);
					this.articleDetail.thumbs_up_count++;
				}

				this.setUserInfo({ ...this.userInfo, thumbs_up_article_ids: thumbsUpArticleIds });
			} catch (e) {
				console.log("未登录，请先登录");
			}
		},
		go2CommentListPage() {
			uni.navigateTo({
				url: `/pages/commentList/commentList?id=${this.articleDetail._id}`,
			});
		},
	},
	computed: {
		content() {
			try {
				return marked(this.articleDetail.content);
			} catch (e) {
				return null;
			}
		},
		isFollowAuthor() {
			try {
				return (
					this.userInfo && this.userInfo.author_likes_ids.includes(this.articleDetail.author.id)
				);
			} catch (e) {
				return false;
			}
		},
		isThumbUp() {
			try {
				return (
					this.userInfo && this.userInfo.thumbs_up_article_ids.includes(this.articleDetail._id)
				);
			} catch (e) {
				return false;
			}
		},
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

	.detail-comment-area {
		margin-top: 60rpx;

		.comment-title {
			padding: 20rpx 30rpx;
			font-size: 28rpx;
			color: #666;
			border-bottom: 1px solid #ddd;
		}

		.comment-content-container {
			padding: 0 30rpx;
			border-bottom: 1px solid #eee;
		}

		.no-data {
			width: 100%;
			padding: 30rpx 0;
			text-align: center;
			color: #999;
			font-size: 28rpx;
		}
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
