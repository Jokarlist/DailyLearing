<script>
import { ref } from "vue";
import { loginUserStore, login } from "../store/loginUser";
import { useRouter } from "vue-router";

export default {
  setup() {
    const loginId = ref("");
    const loginPwd = ref("");
    const router = useRouter();
    const handleLogin = async () => {
      const user = await login({
        loginId: loginId.value,
        loginPwd: loginPwd.value,
      });

      if (user) {
        router.push("/");
      } else {
        alert("账号密码错误！");
        loginId.value = "";
        loginPwd.value = "";
      }
    };

    return {
      loginId,
      loginPwd,
      loginUserStore,
      handleLogin,
    };
  },
};
</script>

<template>
  <form>
    <div class="form-item">
      <label>账号：</label>
      <input type="text" autocomplete="on" v-model="loginId" />
    </div>
    <div class="form-item">
      <label>密码：</label>
      <input type="password" autocomplete="on" v-model="loginPwd" />
    </div>
    <div class="form-item">
      <label></label>
      <button :disabled="loginUserStore.loading" @click.prevent="handleLogin">
        {{ loginUserStore.loading ? "loading..." : "登录" }}
      </button>
    </div>
  </form>
</template>

<style scoped>
.form-item {
  margin: 1em auto;
  width: 300px;
  display: flex;
  align-items: center;
}
.form-item input {
  height: 26px;
  font-size: 14px;
  flex: 1 1 auto;
}
.form-item label {
  width: 70px;
}
.form-item button {
  flex: 1 1 auto;
  background: #50936c;
  border: none;
  outline: none;
  color: #fff;
  border-radius: 5px;
  height: 35px;
  font-size: 16px;
}
</style>
