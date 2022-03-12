<template>
  <ul class="hierarchy-list-container">
    <li v-for="(item, i) in lists" :key="i">
      <span :class="{ active: item.isSelected }" @click="handleClick(item)">{{
        item.name
      }}</span>
      <span
        v-if="item.aside"
        @click="handleClick(item)"
        class="aside"
        :class="{ active: item.isSelected }"
        >{{ item.aside }}</span
      >
      <HierarchyList :lists="item.children" @select="handleClick" />
    </li>
  </ul>
</template>

<script>
export default {
  name: "HierarchyList",
  props: {
    lists: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleClick(item) {
      if (!item.isSelected) {
        this.$emit("select", item);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

.hierarchy-list-container {
  padding: 0;
  list-style: none;

  .hierarchy-list-container {
    margin-left: 1.2em;
  }

  li {
    min-height: 40px;
    line-height: 40px;
    font-size: 14px;
    cursor: pointer;

    .active {
      color: @warn;
      font-weight: bold;
    }

    .aside {
      margin-left: 1em;
      font-size: 12px;
      color: @gray;
    }
  }
}
</style>