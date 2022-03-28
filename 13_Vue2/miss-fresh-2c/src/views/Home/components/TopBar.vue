<template>
  <div class="top-bar-container">
    <a-button
      type="primary"
      style="margin-bottom: 16px"
      @click="toggleCollapsed"
    >
      <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <div class="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>
          <a href="">统计</a>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <ul class="user-info">
      <li>
        欢迎&nbsp;高岭之皂
        <a-icon type="down" />
      </li>
      <li>退出</li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    toggleCollapsed() {
      this.$store.dispatch("toggleCollapsed");
    },
  },
};
</script>

<style lang="less" scoped>
.top-bar-container {
  height: 50px;
  padding: 0 20px 0 10px;
  line-height: 50px;
  border-bottom: 1px solid #eee;

  .breadcrumb {
    display: inline-block;
    margin-left: 20px;
  }

  .user-info {
    float: right;
    text-align: center;
    cursor: pointer;

    li {
      padding: 0 20px;

      &:last-child {
        display: none;

        &:hover {
          background: #eee;
          color: #999;
          font-weight: 700;
        }
      }
    }

    &:hover {
      li:last-child {
        display: block;
      }
    }
  }
}
</style>