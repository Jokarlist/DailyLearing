<template>
	<view class="tabbar-container">
		<scroll-view
			class="tabbar-scroll"
			scroll-x
			scroll-with-animation
			:scroll-into-view="`item${activeIdx}`"
		>
			<view class="tabbar-scroll-box">
				<view
					class="tabbar-scroll-item"
					v-for="(item, idx) in labelList"
					:key="idx"
					:class="{ active: activeIdx === idx }"
					@click="labelItemClick(idx)"
					:id="`item${idx}`"
				>
					{{ item.name }}
				</view>
			</view>
		</scroll-view>
		<view class="tabbar-setting">
			<uni-icons type="gear" size="26" color="666" @click="goToLabelSetting" />
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
		activeIdx: {
			type: Number,
			default: 0,
		},
	},
	methods: {
		async goToLabelSetting() {
			try {
				await this.checkLoginStatus();
				uni.navigateTo({
					url: "/pages/labelSetting/labelSetting",
				});
			} catch (e) {
				console.log("未登录，请先登录");
			}
		},
		labelItemClick(idx) {
			this.$emit("active-idx-change", idx);
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
