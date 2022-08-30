// import { install, Store } from "vuex";
import Vuex from "vuex";
import Vue from "vue";
import user from "./user";
import search from "./search";

// install(Vue);
Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		user,
		search
	},
	strict: true
})
