<template>
	<view class="self-container">
		<view class="my-header" v-if="userInfo">
			<view class="my-header-bg">
				<image src="../../static/img/logo.jpeg" mode="aspectFill"></image>
			</view>
			<view class="my-header-logo">
				<view class="my-header-logo-box">
					<image src="../../static/img/logo.jpeg" mode="aspectFill"></image>
				</view>
				<text class="username">Web讲师团</text>
			</view>
			<view class="my-header-info">
				<view class="my-header-info-box">
					<text class="my-header-info-title">被关注</text> <text>20</text>
				</view>
				<view class="my-header-info-box">
					<text class="my-header-info-title">粉丝</text> <text>50</text>
				</view>
				<view class="my-header-info-box">
					<text class="my-header-info-title">积分</text> <text>100</text>
				</view>
			</view>
		</view>

		<view class="my-content">
			<view class="my-content-list" v-if="!userInfo" @click="go2LoginPage">
				<view class="my-content-list-title">
					<image class="company-logo" src="../../static/img/logo.jpeg" mode="aspectFill"></image>
					<text>hi, 您尚未登录，请点击登录</text>
				</view>
				<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
			</view>
			<view class="my-content-list">
				<view class="my-content-list-title">
					<uni-icons class="icon" type="contact" size="16" color="#666"></uni-icons>
					<text>我的文章</text>
				</view>
				<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
			</view>
			<view class="my-content-list">
				<view class="my-content-list-title">
					<uni-icons class="icon" type="help" size="16" color="#666"></uni-icons>
					<text>意见反馈</text>
				</view>
				<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
			</view>

			<!-- #ifdef APP-PLUS -->
			<view class="my-content-list">
				<view class="my-content-list-title">
					<uni-icons class="icon" type="paperclip" size="16" color="#666"></uni-icons>
					<view class="version-container">
						<text>
							当前版本
							<text v-if="isHaveNewVersion" class="new-version-tip">(点击下载最新版本)</text>
						</text>
						<text class="version">{{ curVersion }}</text>
					</view>
				</view>
				<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
			</view>
			<!-- #endif -->

			<!-- #ifndef APP-PLUS -->
			<button type="warn" class="logout" v-if="userInfo" @click="logout">退出</button>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			curVersion: "1.0.0",
			isHaveNewVersion: false,
		};
	},
	methods: {
		go2LoginPage() {
			uni.navigateTo({
				url: "/pages/user/login/login",
			});
		},
		logout() {
			this.$store.commit("user/setUserInfo", null);
			uni.navigateTo({
				url: "/pages/index/index",
			});
		},
	},
};
</script>

<style lang="scss" scoped>
page {
	background-color: #f5f5f5;
}

.my-header {
	position: relative;
	padding-bottom: 30rpx;

	.my-header-bg {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		opacity: 0.3;
		filter: blur(16rpx);

		image {
			width: 100%;
			height: 100%;
		}
	}

	.my-header-logo {
		position: relative;
		@include flex(column, flex-start, center);
		padding-top: 60rpx;
		z-index: 10;

		.my-header-logo-box {
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.username {
			margin-top: 30rpx;
			font-size: 32rpx;
			font-weight: bold;
		}
	}

	.my-header-info {
		@include flex();
		margin-top: 30rpx;

		.my-header-info-box {
			@include flex(column);
			width: 100%;
			font-size: 24rpx;
			color: #999;

			.my-header-info-title {
				font-size: 28rpx;
				color: #333;
			}
		}
	}
}

.my-content {
	.my-content-list {
		@include flex();
		padding: 30rpx;
		margin-bottom: 20rpx;
		background-color: #fff;
		color: #333;
		font-size: 28rpx;

		.my-content-list-title {
			display: flex;
			align-items: center;
			flex-grow: 1;

			.icon {
				margin-right: 10rpx;
			}

			.version-container {
				@include flex();
				flex-grow: 1;

				.version {
					margin-right: 40rpx;
					color: #888;
					font-weight: bold;
				}

				.new-version-tip {
					font-size: 20rpx;
					color: $base-color;
				}
			}
		}
	}

	.logout {
		margin: 120rpx 20rpx 0;
	}

	// 用户未登录状态
	.company-logo {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		margin-right: 40rpx;
	}
}
</style>
