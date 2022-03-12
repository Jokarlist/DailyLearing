<template>
  <div class="pager-container" v-if="pageNumber > 1">
    <a :class="{ disabled: current === 1 }" v-on:click="handleClick(1)"
      >|&lt;&lt;</a
    >
    <a
      :class="{ disabled: current === 1 }"
      v-on:click="handleClick(current - 1)"
      >&lt;&lt;</a
    >
    <a
      v-for="(n, i) in numbers"
      :key="i"
      :class="{ active: n === current }"
      v-on:click="handleClick(n)"
      >{{ n }}</a
    >
    <a
      :class="{ disabled: current === pageNumber }"
      @click="handleClick(current + 1)"
      >&gt;&gt;</a
    >
    <a
      :class="{ disabled: current === pageNumber }"
      @click="handleClick(pageNumber)"
      >&gt;&gt;|</a
    >
  </div>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    limit: {
      type: Number,
      default: 10,
    },
    visibleNumber: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    /* 要渲染的页码总数 */
    pageNumber() {
      return Math.ceil(this.total / this.limit);
    },
    /* 当前可视的最小页码 */
    visibleMin() {
      let min = this.current - Math.floor(this.visibleNumber / 2);

      if (min < 1) {
        min = 1;
      }

      return min;
    },
    /* 当前可视的最大页码 */
    visibleMax() {
      let max = this.current + Math.floor(this.visibleNumber / 2) - 1;

      if (max > this.pageNumber) {
        max = this.pageNumber;
      }

      return max;
    },
    /* 当前页要渲染的页码数组 */
    numbers() {
      const nums = [];

      for (let i = this.visibleMin; i <= this.visibleMax; i++) {
        nums.push(i);
      }

      return nums;
    },
  },
  methods: {
    /* 处理页码点击 */
    handleClick(newPage) {
      if (newPage < 1) {
        newPage = 1;
      }
      if (newPage > this.pageNumber) {
        newPage = this.pageNumber;
      }
      if (newPage === this.current) {
        return;
      }

      this.$emit("pageChange", newPage);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

.pager-container {
  display: flex;
  margin: 20px 0;
  justify-content: center;
  user-select: none;

  a {
    color: @primary;
    margin: 0 6px;
    cursor: pointer;

    &.disabled {
      color: @lightWords;
      cursor: not-allowed;
    }

    &.active {
      color: @words;
      font-weight: bold;
      cursor: text;
    }
  }
}
</style>
