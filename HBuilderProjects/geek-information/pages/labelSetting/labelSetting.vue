<template>
	<view class="label-setting-container">
		<view class="label-wrapper">
			<view class="label-header">
				<view class="label-title">我的标签</view>
				<view class="label-edit" @click="editLabel">{{ this.isEdit ? "完成" : "编辑" }}</view>
			</view>
			<view class="label-content">
				<view class="label-content-item" v-for="(item, idx) in 8" :key="idx">
					前端开发
					<uni-icons v-show="isEdit" class="icon-remove" type="clear" size="20" color="red" />
				</view>
				<view class="no-data">当前没有数据</view>
			</view>
		</view>
		<view class="label-wrapper">
			<view class="label-header"> <view class="label-title">标签推荐</view> </view>
			<view class="label-content">
				<view class="label-content-item" v-for="(item, idx) in 7" :key="idx"> 后端开发 </view>
				<view class="no-data">当前没有数据</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isEdit: false,
		};
	},
	methods: {
		async editLabel() {
			await this._updateLabel();
			this.isEdit = !this.isEdit;
		},
		async _updateLabel() {
			console.log("更新标签");
		},
	},
};
</script>

<style lang="scss" scoped>
page {
	background-color: $bg-color;

	.label-setting-container {
		.label-wrapper {
			background-color: #fff;
			margin-bottom: 20rpx;

			.label-header {
				@include flex();
				padding: 20rpx 30rpx;
				font-size: 28rpx;
				border-bottom: 1px solid $bg-color;

				.label-title {
					color: #666;
				}

				.label-edit {
					font-weight: bold;
					color: #30b33a;
				}
			}

			.label-content {
				@include flex(row, flex-start, center, wrap);
				padding: 0 30rpx 30rpx;

				.label-content-item {
					position: relative;
					padding: 4rpx 10rpx;
					margin: 24rpx 20rpx 0 0;
					font-size: 28rpx;
					color: #666;
					border-radius: 10rpx;
					border: 1px solid #666;

					.icon-remove {
						position: absolute;
						right: -16rpx;
						top: -16rpx;
						background-color: #fff;
						border-radius: 50%;
					}
				}
			}

			.no-data {
				width: 100%;
				padding: 100rpx 0;
				text-align: center;
				color: #999;
				font-size: 28rpx;
			}
		}
	}
}
</style>
