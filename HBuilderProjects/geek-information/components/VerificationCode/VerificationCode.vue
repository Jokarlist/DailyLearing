<template>
	<view class="verification-code-container">
		<view class="send-btn" @click="getForm">
			{{ existTimer ? `${interval}秒后重新获取` : "获取验证码" }}
		</view>
	</view>
</template>

<script>
export default {
	name: "VerificationCode",
	data() {
		return {
			interval: 60,
			existTimer: false,
			timerId: null,
		};
	},
	methods: {
		getForm() {
			if (this.existTimer) return;
			// 抛出 get-form 事件来获取 form 对象，因为直接采用 prop 传值的方式小程序不兼容（首次渲染后无法获取到 form 对象）
			this.$emit("get-form", this._getVerificationCode);
		},
		async _getVerificationCode(form) {
			try {
				const res = await form.validateField(["phoneNum"]);
				this.existTimer = true;
				this.setTimer();
				const { verificationCode, msg } = await this.$http.getVerificationCode(res);
				uni.showToast({
					title: msg,
					icon: "none",
				});

				console.log("验证码为:", verificationCode);
				this.$emit("get-verification-code", verificationCode);
			} catch (e) {
				console.log(e);
			}
		},
		setTimer() {
			this.timerId = setInterval(() => {
				if (--this.interval === 1) {
					clearInterval(this.timerId);
					this.timerId = null;
					this.existTimer = false;
					this.interval = 60;
				}
			}, 1000);
		},
	},
	beforeDestroy() {
		if (this.timerId) {
			clearInterval(this.timerId);
			this.timerId = null;
			this.existTimer = false;
			this.interval = 60;
		}
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
