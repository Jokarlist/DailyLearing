import App from './App'
import store from "@/store/index.js";

import module from "@/api/request/index.js";
import loginRules from "@/plugin/validateRules.js";
import userInfo from "@/plugin/userInfo.js";

import { router, RouterMount } from './router.js'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

Vue.use(router)

Vue.prototype.$http = module;
Vue.use(loginRules);
Vue.use(userInfo);

const app = new Vue({
	...App,
	store
})

// #ifdef H5
RouterMount(app, router, '#app')
// #endif

// #ifndef H5
app.$mount(); // 为了兼容小程序及app端必须这样写才有效果
// #endif

// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
