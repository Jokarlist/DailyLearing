<template>
  <div class="menu-container">
    <RouterLink
      v-for="item in items"
      :key="item.link"
      :to="{ name: item.name }"
      :exact="item.exact"
      active-class="selected"
      exact-active-class=""
    >
      <div class="icon">
        <Icon :type="item.icon" />
      </div>
      <span>{{ item.title }}</span>
    </RouterLink>
  </div>
</template>

<script>
import Icon from "@/components/Icon.vue";

export default {
  components: {
    Icon,
  },
  data() {
    return {
      items: [
        {
          name: "home",
          title: "首页",
          icon: "home",
          exact: true, // 导航路径和当前路径精确匹配时才添加router-link-active样式
        },
        {
          name: "blog",
          title: "文章",
          icon: "blog",
          exact: false, // 导航路径和当前路径无需精确匹配也可添加router-link-active样式
        },
        {
          name: "about",
          title: "关于我",
          icon: "about",
          exact: true,
        },
        {
          name: "project",
          title: "项目&效果",
          icon: "code",
          exact: true,
        },
        {
          name: "message",
          title: "留言板",
          icon: "chat",
          exact: true,
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

.menu-container {
  margin: 24px 0;
  color: @gray;

  a {
    display: flex;
    padding: 0 50px;
    height: 45px;
    align-items: center;

    &.selected {
      background: darken(@words, 3%);
    }

    .icon {
      width: 24px;
    }

    &:hover {
      color: #fff;
    }
  }
}
</style>