<template>
	<view class="login-container">
		<image src="/static/img/login_bg.png" class="banner-bg" />
		<!-- 导航 -->
		<view class="login-nav">
			<view
				class="nav-item"
				:class="{ active: type === 'account' }"
				@click="changeFormType('account')"
				>账号登录</view
			>
			<view class="nav-item" :class="{ active: type === 'phone' }" @click="changeFormType('phone')"
				>手机登录</view
			>
		</view>
		<!-- 表单 -->
		<uni-forms class="login-form" ref="loginForm" :model="formData">
			<view v-show="type === 'account'">
				<uni-forms-item label="账号" name="username">
					<input
						type="text"
						placeholder="请输入账号"
						placeholder-class="placeholder"
						v-model="formData.username"
					/>
				</uni-forms-item>
				<uni-forms-item label="密码" name="password">
					<input
						type="password"
						placeholder="请输入密码"
						placeholder-class="placeholder"
						v-model="formData.password"
					/>
				</uni-forms-item>
			</view>
			<view v-show="type === 'phone'">
				<uni-forms-item label="手机号" name="phoneNum">
					<input
						type="number"
						placeholder="请输入手机号"
						placeholder-class="placeholder"
						v-model="formData.phoneNum"
					/>
				</uni-forms-item>
				<uni-forms-item label="验证码" name="verification">
					<input
						type="text"
						placeholder="请输入验证码"
						placeholder-class="placeholder"
						v-model="formData.verification"
					/>
					<VerificationCode
						class="verification-code"
						@get-form="getForm"
						@get-verification-code="verificationCode = $event"
					/>
				</uni-forms-item>
			</view>
			<button class="login-btn" @click="_loginSubmit">立即登录</button>
		</uni-forms>
		<view class="login-footer">
			<text class="register">注册</text> <text class="forget-password">忘记密码</text>
		</view>
	</view>
</template>

<script>
export default {
	onReady() {
		// 直接在 uni-forms 组件上通过 rules 属性传值设置表单校验规则，小程序不兼容，因此采用脚本手动设置
		this.$refs.loginForm.setRules(this.loginRules);
	},
	data() {
		return {
			type: "account",
			formData: {
				username: "",
				password: "",
				phoneNum: "",
				verfication: "",
			},
			verificationCode: "",
		};
	},
	methods: {
		changeFormType(type) {
			this.type = type;
			this.$refs.loginForm.clearValidate(); // 清空校验规则
		},
		async _loginSubmit() {
			const field =
				this.type === "account" ? ["username", "password"] : ["phoneNum", "verification"];
			try {
				const res = await this.$refs.loginForm.validateField(field);
				this._sendUserInfo({
					...res,
					type: this.type,
				});
			} catch (err) {
				console.log(err);
			}
		},
		async _sendUserInfo(data) {
			const res = await this.$http.userLogin(data);
			if (res) {
				this.setUserInfo(res);
				uni
					.showToast({
						title: "登陆成功",
						icon: "success",
					})
					.then(() => setTimeout(() => uni.navigateBack(), 1500));
			}
		},
		getForm(callback) {
			callback && callback(this.$refs.loginForm);
		},
	},
};
</script>

<style lang="scss" scoped>
page {
	height: 100%;
}

.login-container {
	height: 100%;
	width: 100%;
	background-color: #f8f8f8;

	.banner-bg {
		width: 100%;
		height: 400rpx;
	}

	.login-nav {
		@include flex();
		padding: 0 146rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #999;

		.nav-item {
			position: relative;
			margin-bottom: 40rpx;

			&.active {
				color: $base-color;
				&.after {
					position: absolute;
					bottom: -20rpx;
					left: 50%;
					height: 8rpx;
					width: 60rpx;
					border-radius: 4rpx;
					background-color: $base-color;
					transform: translateX(-50%);
					content: "";
				}
			}
		}
	}

	.login-footer {
		@include flex();
		width: 640rpx;
		margin: 20rpx auto;
		color: #999;
		font-size: 26rpx;
		text-decoration: underline;
	}
}

/deep/ .uni-forms-item__content {
	@include flex(row, flex-start, center);
}

/deep/ .uni-forms-item {
	padding-left: 30rpx;
	border-bottom: 1px solid #eee;
	padding-top: 24rpx;
	background-color: #fff;
}

/deep/ .uni-forms-item__inner {
	padding-bottom: 24rpx;
}

/deep/ .label-text span {
	font-size: 32rpx;
}

.placeholder {
	color: #ccc;
	font-size: 28rpx;
}

.login-btn {
	@include flex(row, center);
	width: 640rpx;
	height: 90rpx;
	margin-top: 80rpx;
	color: #fff;
	font-size: 32rpx;
	border-radius: 10rpx;
	background-color: $base-color;
}
</style>
