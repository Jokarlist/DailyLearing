import { reactive, readonly } from "vue";
import * as userServ from "../api/user";

const state = reactive({
  user: null,
  loading: false,
});

export const loginUserStore = readonly(state);

export async function login({ loginId, loginPwd }) {
  state.loading = true;
  const user = await userServ.login(loginId, loginPwd);
  state.user = user;
  state.loading = false;
  
  return user;
}

export async function logout() {
  state.loading = true;
  await userServ.logout();
  state.user = null;
  state.loading = false;
}

export async function whoAmI() {
  state.loading = true;
  const user = await userServ.whoAmI();
  state.user = user;
  state.loading = false;
}
