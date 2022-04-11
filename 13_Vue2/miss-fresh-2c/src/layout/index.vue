<template>
  <div class="layout-container">
    <Menu :key="reRenderKey" />
    <div
      class="main-content"
      :class="{ 'menu-collapsed': $store.state.collapsed }"
    >
      <TopBar />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Menu from "./components/Menu.vue";
import TopBar from "./components/TopBar.vue";

export default {
  components: {
    Menu,
    TopBar,
  },
  data() {
    return {
      reRenderKey: Date.now() + "",
    };
  },
  watch: {
    ["$route.matched"]() {
      this.reRenderKey = Date.now() + "";
    },
  },
};
</script>

<style lang="less" scoped>
.main-content {
  margin-left: 180px;
  transition: margin, 0.3s;

  &.menu-collapsed {
    margin-left: 80px;
  }
}
</style>
