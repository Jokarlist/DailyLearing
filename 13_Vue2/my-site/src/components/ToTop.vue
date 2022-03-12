<template>
  <div class="to-top-container" v-show="show" @click="handleClick">Top</div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    handleMainScroll(dom) {
      if (!dom) {
        this.show = false;
        return;
      }

      this.show = dom.scrollTop >= 500;
    },
    handleClick() {
      this.$bus.$emit("setMainScroll", 0);
    },
  },
  created() {
    this.$bus.$on("mainScroll", this.handleMainScroll);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.handleMainScroll);
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

.to-top-container {
  position: fixed;
  right: 50px;
  bottom: 50px;
  width: 50px;
  height: 50px;
  line-height: 50px;
  color: #fff;
  text-align: center;
  background: @primary;
  border-radius: 50%;
  cursor: pointer;
  z-index: 99;
}
</style>