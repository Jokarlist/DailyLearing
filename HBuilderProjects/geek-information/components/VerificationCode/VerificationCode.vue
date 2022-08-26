<template>
	<view class="verification-code-container"> <view class="send-btn"> 获取验证码 </view> </view>
</template>

<script>
export default {
	name: "VerificationCode",
	data() {
		return {};
	},
};
</script>

<style lang="scss" scoped>
.verification-code-container {
	margin-right: 20rpx;
	flex-shrink: 0;

	.send-btn {
		background-color: $base-color;
		color: #fff;
		padding: 20rpx;
		border-radius: 10rpx;
		opacity: 0.8;
	}
}
</style>
