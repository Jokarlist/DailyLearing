<template>
	<view class="tabbar-container">
		<scroll-view class="tabbar-scroll" scroll-x>
			<view class="tabbar-scroll-box">
				<view
					class="tabbar-scroll-item"
					v-for="(item, i) in labelList"
					:key="i"
					:class="{ active: activeIdx === i }"
					@click="onScrollItemClick(i)"
				>
					{{ item.name }}
				</view>
			</view>
		</scroll-view>
		<view class="tabbar-setting">
			<uni-icons type="gear" size="26" color="666" @click="onTabbarSettingClick" />
		</view>
	</view>
</template>

<script>
export default {
	name: "TabBar",
	props: {
		labelList: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			activeIdx: 0,
		};
	},
	methods: {
		onTabbarSettingClick() {
			uni.navigateTo({
				url: "/pages/labelSetting/labelSetting",
			});
		},
		onScrollItemClick(idx) {
			this.activeIdx = idx;
		},
	},
};
</script>

<style lang="scss" scoped>
.tabbar-container {
	@include flex();
	width: 100%;
	border-bottom: 1px solid #f5f5f5;
	background-color: #fff;
	box-sizing: border-box;

	.tabbar-scroll {
		flex: 1;
		height: 90rpx;
		box-sizing: border-box;
		overflow: hidden;

		.tabbar-scroll-box {
			@include flex(row, flex-start);
			height: 90rpx;
			box-sizing: border-box;

			.tabbar-scroll-item {
				flex-shrink: 0;
				padding: 0 20rpx;
				color: #333;
				font-size: 28rpx;
				&.active {
					color: $base-color;
				}
			}
		}
	}

	.tabbar-setting {
		position: relative;
		width: 90rpx;
		@include flex(row, center);
		&::after {
			position: absolute;
			left: 0;
			height: 32rpx;
			width: 2rpx;
			background-color: #ddd;
			content: "";
		}
	}
}
</style>
