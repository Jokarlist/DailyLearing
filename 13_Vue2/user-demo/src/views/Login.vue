<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-item">
      <label for="">Account：</label>
      <input type="text" autocomplete="username" v-model="loginId" />
    </div>
    <div class="form-item">
      <label for="">Password：</label>
      <input type="password" autocomplete="new-password" v-model="loginPwd" />
    </div>
    <div class="form-item">
      <label for=""></label>
      <button :disabled="loading">
        {{ loading ? "loading..." : "login" }}
      </button>
    </div>
  </form>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      loginId: "",
      loginPwd: "",
    };
  },
  computed: {
    ...mapState("loginUser", ["loading"]),
  },
  methods: {
    async handleSubmit() {
      const res = await this.$store.dispatch("loginUser/login", {
        loginId: this.loginId,
        loginPwd: this.loginPwd,
      });

      if (res) {
        const path = this.$route.query.desturl || "/";
        this.$router.push(path);
      } else {
        alert("账号或密码错误");
        this.loginId = this.loginPwd = "";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.form-item {
  display: flex;
  width: 300px;
  margin: 1em auto;
  align-items: center;

  input {
    height: 26px;
    font-size: 14px;
    flex: 1 1 auto;
  }

  label {
    width: 80px;
  }

  button {
    height: 35px;
    color: #fff;
    font-size: 16px;
    outline: none;
    background: #50936c;
    border: none;
    border-radius: 5px;
    flex: 1 1 auto;
    cursor: pointer;
  }
}
</style>