<template>
  <div class="login-container">
    <a-form-model
      ref="loginForm"
      :model="loginForm"
      :rules="rules"
      v-bind="layout"
    >
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="loginForm.email" autocomplete="on" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="password">
        <a-input
          v-model="loginForm.password"
          type="password"
          autocomplete="current-password"
        />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button
          type="primary"
          @click="submitForm('loginForm')"
          :disabled="submitting"
        >
          登录
        </a-button>
        <a-button style="margin-left: 30px" @click="resetForm('loginForm')">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import * as userAPI from "@/api/user";

export default {
  data() {
    const emailRule = /^[\w-]+@[\w.-]+\.com$/;
    let checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入邮箱"));
      }

      if (emailRule.test(value)) {
        return callback();
      }

      return callback(new Error("邮箱格式不正确"));
    };

    let validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }

      callback();
    };

    return {
      loginForm: {
        email: "",
        password: "",
      },
      rules: {
        password: [{ validator: validatePassword, trigger: "change" }],
        email: [{ validator: checkEmail, trigger: "change" }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
      submitting: false,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitting = true;
          userAPI
            .login(this.loginForm)
            .then((res) => {
              console.log(res);
              this.$store.dispatch("userInfo/login", res);
              this.$router.push({ name: "Layout" });
              this.submitting = false;
            })
            .catch((error) => {
              this.$message.error(error);
              this.submitting = false;
            });

          return true;
        }

        console.log("登录失败！");
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  width: 550px;
  margin: 125px auto;
  padding: 15px 0 0 77px;
  border: 1px dashed #eee;
}
</style>