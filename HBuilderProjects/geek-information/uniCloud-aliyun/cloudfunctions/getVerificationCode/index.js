'use strict';
exports.main = async ({ phoneNum }, context) => {
	const verificationCode = Math.random().toString().substring(2, 8);
	try {
		const res = await uniCloud.sendSms({
			appid: '__UNI__1C9D617',
			smsKey: '3c0d7dfb3a3043c5ddd391642a9d63b6',
			smsSecret: '9a636053afd48d7cca60c2e2e85b3097',
			phone: phoneNum,
			templateId: '15560',
			data: {
				code: verificationCode,
				expMinute: '1',
			}
		});

		return {
			code: 0,
			data: {
				verificationCode,
				msg: "验证码发送成功，请注意查收"
			}
		};
	} catch (err) {
		return {
			code: 1,
			msg: "验证码发送失败"
		};
	}
};
