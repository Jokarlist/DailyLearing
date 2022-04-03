<template>
  <div style="width: 180px" class="menu-container">
    <a-menu
      :default-selected-keys="[
        $router.currentRoute.matched[1]
          ? $router.currentRoute.matched[1].name
          : '',
      ]"
      :default-open-keys="[$router.currentRoute.matched[0].name]"
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
          <a-menu-item
            v-for="childRoute in route.children"
            :key="childRoute.name"
          >
            <router-link :to="{ name: childRoute.name }">
              <a-icon :type="childRoute.meta.icon" />
              {{ childRoute.meta.title }}
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </template>
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
