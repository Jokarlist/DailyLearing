<template>
  <div class="blog-toc-container">
    <h2>目录</h2>
    <HierarchyList :lists="tocWithSelected" @select="handleSelect" />
  </div>
</template>

<script>
import HierarchyList from "./HierarchyList.vue";
import { debounce } from "@/utils";

export default {
  props: {
    toc: {
      type: Array,
      required: true,
    },
  },
  components: {
    HierarchyList,
  },
  data() {
    return {
      selectedAnchor: "",
    };
  },
  computed: {
    /**
     * 根据toc数组和selectedAnchor属性获得带有isSelected属性的新toc数组
     */
    tocWithSelected() {
      const getTOC = (toc = []) => {
        return toc.map((t) => ({
          ...t,
          isSelected: t.anchor === this.selectedAnchor,

          // 若有子数组则要递归遍历子数组
          children: getTOC(t.children),
        }));
      };

      return getTOC(this.toc);
    },

    /**
     * 根据toc数组获取它们对应的元素数组
     */
    doms() {
      const doms = [];
      const addToDoms = (toc) => {
        for (const t of toc) {
          doms.push(document.getElementById(t.anchor));

          // 若有子数组则要递归遍历子数组
          if (t.children && t.children.length) {
            addToDoms(t.children);
          }
        }
      };

      addToDoms(this.toc);
      return doms;
    },
  },
  methods: {
    handleSelect(item) {
      location.hash = item.anchor;
    },

    /**
     * 设置selectedAnchor的正确值
     */
    setSelectedAnchor() {
      // 规定限制区域范围
      const range = 50;
      for (const dom of this.doms) {
        // 没有获取到相应的dom元素
        if (!dom) {
          continue;
        }

        // dom元素距离视口的高度
        const top = dom.getBoundingClientRect().top;

        // 判断dom元素距视口高度与规定范围的关系
        if (top >= 0 && top <= range) {
          // 在规定范围内，可标记该dom为选中状态
          this.selectedAnchor = dom.id;
          return;
        } else if (top > range) {
          // 在规定范围的下方，不改变任何选中状态
          return;
        } else {
          // 在规定范围的上方，先假设该dom是选中状态，继续循环下一个dom
          this.selectedAnchor = dom.id;
        }
      }
    },
  },
  created() {
    // 做防抖处理
    this.setSelectedAnchorDebounce = debounce(this.setSelectedAnchor, 50);
    this.$bus.$on("mainScroll", this.setSelectedAnchorDebounce);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.setSelectedAnchorDebounce);
  },
};
</script>

<style lang="less" scoped>
.blog-toc-container {
  h2 {
    margin: 0;
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
  }
}
</style>