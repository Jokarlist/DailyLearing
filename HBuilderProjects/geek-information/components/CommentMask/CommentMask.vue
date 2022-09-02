<template>
	<view class="comment-mask-container">
		<uni-popup ref="popup" type="bottom" :mask-click="false">
			<view class="popup-container">
				<view class="popup-header">
					<view class="popup-header-item" @click="closeCommentMask">取消</view>
					<view class="popup-header-item" @click="publishComment">发布</view>
				</view>
				<view class="popup-content">
					<textarea
						class="popup-content-textarea"
						v-model.trim="commentValue"
						maxlength="200"
						fixed
						placeholder="请输入评论内容"
					></textarea>
					<view class="popup-content-count">{{ commentValue.length }}/200</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
export default {
	name: "CommentMask",
	props: {
		showPopup: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			commentValue: ""
		};
	},
	watch: {
		showPopup(newVal, oldVal) {
			newVal ? this.$refs.popup.open() : this.$refs.popup.close();
		}
	},
	methods: {
		closeCommentMask() {
			this.$emit("close-comment-mask", false);
		},
		publishComment() {
			if (!this.commentValue) {
				uni.showToast({
					title: "请输入评论内容",
					icon: "none"
				});

				return;
			} else {
				this.$emit("publish-comment", this.commentValue);
				this.commentValue = "";
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.popup-container {
	background-color: #fff;

	.popup-header {
		@include flex();
		font-size: 28rpx;
		color: #999;
		border-bottom: 1px #f5f5f5 solid;

		.popup-header-item {
			height: 100rpx;
			line-height: 100rpx;
			padding: 0 30rpx;
		}
	}

	.popup-content {
		width: 100%;
		padding: 30rpx;
		box-sizing: border-box;

		.popup-content-textarea {
			height: 400rpx;
			width: 100%;
		}

		.popup-content-count {
			@include flex(row, flex-end);
			font-size: 24rpx;
			color: #999;
		}
	}
}
</style>
