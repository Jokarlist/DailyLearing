<template>
  <div class="site-aside-container">
    <template v-if="data">
      <Avatar :src="data.avatar" />
      <p class="title">{{ data.siteTitle }}</p>
    </template>
    <Menu />
    <template v-if="data">
      <Contact :data="data" />
      <p class="footer">{{ data.icp }}</p>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Avatar from "@/components/Avatar";
import Contact from "./Contact";
import Menu from "./Menu";

export default {
  components: {
    Avatar,
    Contact,
    Menu,
  },
  computed: {
    ...mapState("setting", ["loading", "data"]),
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

.site-aside-container {
  width: 100%;
  height: 100%;
  padding: 20px 0;
  background-color: @dark;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  overflow: hidden;

  .avatar-container {
    margin: 0 auto;
  }

  .title {
    color: #fff;
    font-size: 1.2em;
    text-align: center;
  }

  .footer {
    font-size: 12px;
    text-align: center;
  }
}
</style>