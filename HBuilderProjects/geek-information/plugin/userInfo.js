// 由于多个界面都会用到 userInfo，故提供一个插件，应用时全局混入关于 userInfo 的操作
import { mapState, mapMutations } from "vuex";

export default {
	install(Vue) {
		Vue.mixin({
			methods: {
				checkLoginStatus() {
					return new Promise((resolve, reject) => {
						if (this.userInfo) {
							resolve();
						} else {
							uni.navigateTo({
								url: "/pages/user/login/login",
							}).then(reject);
						}
					})
					// return !!this.userInfo;
				},
				...mapMutations("user", ["setUserInfo"])
			},
			computed: {
				...mapState("user", ["userInfo"])
			}
		});
	}
}
