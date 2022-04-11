<template>
  <div style="width: 180px" class="menu-container">
    <a-menu
      :default-selected-keys="[defaultSelectedKeys]"
      :default-open-keys="[defaultOpenKeys]"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.collapsed"
    >
      <template v-for="route in $store.state.routeRecords.routeRecords">
        <a-sub-menu :key="route.name" v-if="!route.meta.hidden">
          <span slot="title">
            <a-icon :type="route.meta.icon" />
            <span>{{ route.meta.title }}</span>
          </span>
          <template v-for="childRoute in route.children">
            <a-menu-item :key="childRoute.name" v-if="!childRoute.meta.hidden">
              <router-link :to="{ name: childRoute.name }">
                <a-icon :type="childRoute.meta.icon" />
                {{ childRoute.meta.title }}
              </router-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
export default {
  computed: {
    defaultSelectedKeys() {
      return this.$route.matched[1] ? this.$route.matched[1].name : "";
    },
    defaultOpenKeys() {
      return this.$route.matched[0].name;
    }
  }
};
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
