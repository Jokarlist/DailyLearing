<template>
	<view class="feedback-container">
		<view class="feedback-title">意见反馈：</view>
		<view class="feedback-content">
			<textarea
				class="feedback-textarea"
				v-model="content"
				placeholder="请描述您要反馈的问题"
			></textarea>
		</view>
		<view class="feedback-title">反馈图片：</view>

		<view class="feedback-image-box">
			<view class="feedback-image-item" v-for="(item, idx) in imageList" :key="item.src">
				<view class="close-icon" @click="deleteImage(idx)">
					<uni-icons type="closeempty" size="18" color="#fff"></uni-icons>
				</view>
				<view class="image-box"> <image :src="item.src" mode="aspectFill"></image> </view>
			</view>
			<view class="feedback-image-item" v-if="imageList.length < 5" @click="_addImage">
				<view class="image-box">
					<uni-icons type="plusempty" size="50" color="#eee"></uni-icons>
				</view>
			</view>
		</view>

		<button type="warn" class="feedback-button" @click="_submitFeedback">提交反馈意见</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			content: "",
			imageList: [],
		};
	},
	methods: {
		async _addImage() {
			const count = 5 - this.imageList.length;
			uni.chooseImage({
				count,
				success: ({ tempFilePaths, tempFiles }) => {
					tempFilePaths.forEach((p, idx) => {
						if (idx < count) {
							this.imageList.push({
								src: p,
								// #ifdef H5
								name: tempFiles[idx].name,
								// #endif
								// #ifndef H5
								name: String(Date.now()) + p.substring(p.lastIndexOf(".")),
								// #endif
							});
						}
					});
				},
			});
		},
		deleteImage(idx) {
			this.imageList.splice(idx, 1);
		},
		async _submitFeedback() {
			if (!this.content) {
				uni.showToast({
					title: "反馈内容不能为空",
					icon: "none",
				});

				return;
			}

			uni.showLoading({
				title: "反馈意见上传中",
			});

			const feedbackImageList = await Promise.all(this.getFileId());
			uni.hideLoading();
			const { msg } = await this.$http.updateFeedback({
				content: this.content,
				feedbackImageList,
				userId: this.userInfo._id,
			});

			uni
				.showToast({
					title: msg,
					duration: 1500,
				})
				.then(() =>
					setTimeout(() =>
						uni.switchTab({
							url: "/pages/self/self",
						})
					)
				);
		},
		getFileId() {
			return this.imageList.map(item => {
				return new Promise(async resolve => {
					const result = await uniCloud.uploadFile({
						filePath: item.src,
						cloudPath: item.name,
					});

					resolve(result.fileID);
				});
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.feedback-title {
	margin: 30rpx;
	margin-bottom: 0;
	font-size: 28rpx;
	color: #666;
}

.feedback-content {
	margin: 30rpx;
	padding: 20rpx;
	border: 1px solid #eee;
	box-sizing: border-box;

	.feedback-textarea {
		width: 100%;
		height: 200rpx;
		font-size: 24rpx;
	}
}

.feedback-image-box {
	display: flex;
	flex-wrap: wrap;
	padding: 20rpx;

	.feedback-image-item {
		position: relative;
		width: 33.33%;
		height: 0;
		padding-top: 33.33%;
		box-sizing: border-box;

		.close-icon {
			position: absolute;
			right: 0;
			top: 0;
			width: 44rpx;
			height: 44rpx;
			border-radius: 50%;
			background-color: $base-color;
			z-index: 2;
			@include flex(row, center);
		}

		.image-box {
			@include flex(row, center);
			position: absolute;
			top: 10rpx;
			right: 10rpx;
			left: 10rpx;
			bottom: 10rpx;
			border: 1px solid #eee;
			border-radius: 10rpx;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}
}

.feedback-button {
	margin: 0 30rpx;
	background-color: $base-color;
}
</style>
