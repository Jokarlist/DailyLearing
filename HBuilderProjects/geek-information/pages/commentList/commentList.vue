<template>
	<view class="comment-list-container">
		<view class="comment-content-container" v-for="item in commentList" :key="item.comment_id">
			<CommentItem :comment-data="item" @comment-reply="commentReply" />
		</view>
		<uni-load-more
			:status="loadStatus"
			v-if="!commentList.length || commentList.length > 5"
			:content-text="{
				contentdown: '上拉显示更多',
				contentrefresh: '正在加载...',
				contentnomore: '没有更多评论了',
			}"
		/>
		<CommentMask
			:show-popup="showPopup"
			@close-comment-mask="showPopup = $event"
			@publish-comment="_publishComment"
		/>
	</view>
</template>

<script>
export default {
	onLoad({ id }) {
		this.articleId = id;
		this._getCommentList();
	},
	onReachBottom() {
		if (this.loadStatus === "noMore") return;
		this.pageNum++;
		this._getCommentList();
	},
	data() {
		return {
			articleId: "",
			commentList: [],
			pageNum: 1,
			pageSize: 5,
			loadStatus: "loading",
			showPopup: false,
			replyData: {},
		};
	},
	methods: {
		async _getCommentList() {
			const commentList = await this.$http.getCommentList({
				articleId: this.articleId,
				pageNum: this.pageNum,
				pageSize: this.pageSize,
			});

			if (!commentList.length) {
				this.loadStatus = "noMore";
				return;
			}

			this.commentList = [...this.commentList, ...commentList];
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
				articleId: this.articleId,
				userId: this.userInfo._id,
				content: commentValue,
				...this.replyData, // 若当前为对指定评论回复则 replyData 有值
			});

			uni.showToast({
				title: msg,
			});

			this.showPopup = false;
			this.replyData = {};
			this.pageNum = 1;
			this.commentList = [];
			this.loadStatus = "loading";
			this._getCommentList();
		},
	},
};
</script>

<style lang="scss" scoped>
.comment-content-container {
	padding: 0 15rpx;
	border-bottom: 1px solid #eee;
}
</style>
