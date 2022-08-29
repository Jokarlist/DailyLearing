import App from './App'
import store from "@/store/index.js";

import module from "@/api/request/index.js";
import loginRules from "@/plugin/validateRules.js";
import userInfo from "@/plugin/userInfo.js";

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$http = module;
Vue.use(loginRules);
Vue.use(userInfo);

const app = new Vue({
	...App,
	store
})
app.$mount()
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
