<template>
  <div id="app">
    <div class="app-container">
      <Layout>
        <template v-slot:left>
          <div class="aside">
            <SiteAside />
          </div>
        </template>
        <RouterView />
      </Layout>
      <ToTop />
    </div>
  </div>
</template>

<script>
import Layout from "@/components/Layout";
import SiteAside from "@/components/SiteAside";
import ToTop from "@/components/ToTop";

export default {
  name: "App",
  components: {
    Layout,
    SiteAside,
    ToTop,
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";

.app-container {
  .self-fill(fixed);
}

.aside {
  width: 250px;
  height: 100%;
}
</style>