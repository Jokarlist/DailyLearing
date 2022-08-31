<template>
	<view class="label-setting-container">
		<view class="label-wrapper">
			<view class="label-header">
				<view class="label-title">我的标签</view>
				<view class="label-edit" @click="editLabel">{{ this.isEdit ? "完成" : "编辑" }}</view>
			</view>
			<view class="label-content">
				<view class="label-content-item" v-for="(item, idx) in selfLabelList" :key="item._id">
					{{ item.name }}
					<uni-icons
						v-show="isEdit"
						class="icon-remove"
						type="clear"
						size="20"
						color="red"
						@click="removeLabelItem(item)"
					/>
				</view>
				<view v-show="!selfLabelList.lengh" class="no-data">当前没有数据</view>
			</view>
		</view>
		<view class="label-wrapper">
			<view class="label-header"> <view class="label-title">标签推荐</view> </view>
			<view class="label-content">
				<view
					class="label-content-item"
					v-for="(item, idx) in recommendLabelList"
					:key="item._id"
					@click="changeSelfLabelList(item)"
				>
					{{ item.name }}
				</view>
				<view v-show="!recommendLabelList.length" class="no-data">当前没有数据</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from "vuex";

export default {
	data() {
		return {
			isEdit: false,
			labelIds: [],
		};
	},
	methods: {
		async editLabel() {
			this.isEdit && (await this._updateLabel());
			this.isEdit = !this.isEdit;
		},
		async _updateLabel() {
			const {msg} = await this.$http.updateLabelIds({
				userId: this.userInfo._id,
				labelIds: this.labelIds,
			});
			
			uni.showToast({
				title: msg,
				icon: "none"
			});
			
			this.setUserInfo({...this.userInfo, label_ids: this.labelIds});
		},
		removeLabelItem(labelItem) {
			this.labelIds = this.labelIds.filter(id => id !== labelItem._id);
		},
		changeSelfLabelList(labelItem) {
			this.isEdit && this.labelIds.push(labelItem._id);
		},
	},
	computed: {
		...mapState("label", ["labelList"]),
		selfLabelList() {
			return this.labelList.slice(1).filter(l => this.labelIds.includes(l._id));
		},
		recommendLabelList() {
			return this.labelList.slice(1).filter(l => !this.labelIds.includes(l._id));
		},
	},
	watch: {
		userInfo: {
			immediate: true,
			handler(newVal, oldVal) {
				this.labelIds = [...this.userInfo.label_ids];
			},
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
