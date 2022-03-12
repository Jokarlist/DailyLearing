<template>
  <form
    class="data-form-container"
    id="data-form-container"
    @submit.prevent="handleSubmit"
    ref="form"
  >
    <div class="form-item">
      <div class="input-area">
        <input
          type="text"
          placeholder="用户昵称"
          maxlength="10"
          v-model="formData.nickname"
        />
        <span class="tip">{{ formData.nickname.length }}/10</span>
      </div>
      <div class="error">{{ error.nickname }}</div>
    </div>
    <div class="form-item">
      <div class="text-area">
        <textarea
          placeholder="输入内容"
          maxlength="300"
          v-model="formData.content"
        ></textarea>
        <span class="tip">{{ formData.content.length }}/300</span>
      </div>
      <div class="error">{{ error.content }}</div>
    </div>
    <div class="form-item">
      <div class="button-area">
        <button :disabled="isSubmitting">
          {{ isSubmitting ? "提交中..." : "提交" }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        nickname: "",
        content: "",
      },
      error: {
        nickname: "",
        content: "",
      },
      isSubmitting: false,
    };
  },
  methods: {
    handleSubmit() {
      this.error.nickname = this.formData.nickname ? "" : "请填写昵称";
      this.error.content = this.formData.content ? "" : "请填写内容";

      if (this.error.nickname || this.error.content) {
        return;
      }

      this.isSubmitting = true;
      this.$emit("submit", this.formData, (successMsg) => {
        this.$showMessage({
          content: successMsg,
          type: "success",
          duration: 1000,
          container: this.$refs.form,
          callback: () => {
            this.formData.nickname = "";
            this.formData.content = "";
            this.isSubmitting = false;
          },
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

.data-form-container {
  margin-bottom: 20px;
  overflow: hidden;

  .form-item {
    margin-bottom: 8px;

    .input-area {
      position: relative;
      width: 50%;
    }

    .text-area {
      position: relative;
    }

    .tip {
      position: absolute;
      right: 5px;
      bottom: 5px;
      color: #b4b8bc;
      font-size: 12px;
    }

    input,
    textarea {
      display: block;
      width: 100%;
      color: @words;
      font-size: 14px;
      border: 1px dashed @gray;
      border-radius: 4px;
      box-sizing: border-box;
      outline: none;

      &:focus {
        border-color: @primary;
      }
    }

    input {
      height: 40px;
      padding: 0 15px;
    }

    textarea {
      height: 120px;
      padding: 8px 15px;
      resize: none;
    }

    .error {
      height: 20px;
      margin-top: 6px;
      font-size: 14px;
      color: @danger;
      line-height: 20px;
    }

    button {
      position: relative;
      width: 100px;
      height: 34px;
      color: #fff;
      border-radius: 4px;
      background: @primary;
      cursor: pointer;
      border: none;
      outline: none;

      &:hover {
        background: darken(@primary, 10%);
      }

      &:disabled {
        background: lighten(@primary, 20%);
        cursor: not-allowed;
      }
    }
  }
}
</style>