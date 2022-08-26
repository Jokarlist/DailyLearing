// 提供一个插件， 应用时全局混入一些验证规则
export default {
	install(Vue) {
		Vue.mixin({
			data() {
				return {
					loginRules: {
						username: {
							rules: [
								{ required: true, errorMessage: "用户名不能为空" },
								{ validateFunction: this.validateUsername }
							]
						},
						password: {
							rules: [
								{ required: true, errorMessage: "密码不能为空" },
							]
						},
						phoneNum: {
							rules: [
								{ require: true, errorMessage: "电话号码不能为空" },
								{ validateFunction: this.validatePhoneNum }
							]
						},
						verification: {
							rules: [
								{ required: true, errorMessage: "验证码不能为空" },
							]
						},
					},
					phoneNumReg: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
				}
			},
			methods: {
				validateUsername(rule, val, data, callback) {
					if (val.length < 3) {
						callback("用户名长度必须大于3");
					} else {
						return true;
					}
				},
				validatePhoneNum(rule, val, data, callback) {
					if (!this.phoneNumReg.test(val)) {
						callback("电话号码格式不正确");
					} else {
						return true;
					}
				}
			}
		});
	}
}
