<template>
  <div style="width: 180px" class="menu-container">
    <a-menu
      :default-selected-keys="['1']"
      :default-open-keys="['sub1']"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.collapsed"
    >
      <a-sub-menu
        v-for="item in $store.state.routeRecords.routeRecords"
        :key="item.name"
      >
        <span slot="title">
          <a-icon type="mail" />
          <span>{{ item.meta.title }}</span>
        </span>
        <a-menu-item v-for="item in item.children" :key="item.name">{{
          item.meta.title
        }}</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.menu-container {
  position: fixed;
  height: 100%;

  .ant-menu {
    height: 100%;
  }
}
</style>
