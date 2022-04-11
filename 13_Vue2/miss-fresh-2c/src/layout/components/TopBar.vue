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
        <a-breadcrumb-item>{{ title }}</a-breadcrumb-item>
        <a-breadcrumb-item>
          <router-link :to="{ name: subtitleLink }">{{ subtitle }}</router-link>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <ul class="user-info">
      <li>
        欢迎&nbsp;{{ $store.state.userInfo.username }}
        <a-icon type="down" />
      </li>
      <li @click="handleLogout">退出</li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    title() {
      return this.$route.matched[0].meta.title;
    },
    subtitle() {
      return this.$route.matched[1] ? this.$route.matched[1].meta.title : "";
    },
    subtitleLink() {
      return this.$route.matched[1] ? this.$route.matched[1].name : "";
    },
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch("toggleCollapsed");
    },
    handleLogout() {
      this.$store.dispatch("userInfo/logout");
      this.$router.push({ name: "Login" });
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
    position: relative;
    float: right;
    text-align: center;
    cursor: pointer;

    li {
      padding: 0 20px;

      &:last-child {
        position: absolute;
        right: 40px;
        display: none;
        z-index: 99;
        
        &:hover {
          color: #999;
          backdrop-filter: blur(3px);
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