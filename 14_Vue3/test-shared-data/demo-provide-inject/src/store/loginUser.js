import * as userServ from "../api/user";
import { inject, reactive, readonly } from "vue";

const key = Symbol();

export function provideStore(app) {
  const state = reactive({
    user: null,
    loading: false,
  });

  async function login({ loginId, loginPwd }) {
    state.loading = true;
    const user = await userServ.login(loginId, loginPwd);
    state.user = user;
    state.loading = false;

    return user;
  }

  async function logout() {
    state.loading = true;
    await userServ.logout();
    state.user = null;
    state.loading = false;
  }

  async function whoAmI() {
    state.loading = true;
    const user = await userServ.whoAmI();
    state.user = user;
    state.loading = false;
  }

  app.provide(key, {
    state: readonly(state),
    login,
    logout,
    whoAmI,
  });
}

export function injectStore(defaultValue = null) {
  return inject(key, defaultValue);
}
