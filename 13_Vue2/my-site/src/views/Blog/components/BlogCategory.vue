<template>
  <div class="blog-category-container">
    <h2>文章分类</h2>
    <HierarchyList :lists="lists" @select="handleSelect" />
  </div>
</template>

<script>
import HierarchyList from "./HierarchyList.vue";
import fetchData from "@/mixins/fetchData";
import { getBlogCategories } from "@/api/blog";

export default {
  mixins: [fetchData([])],
  components: {
    HierarchyList,
  },
  methods: {
    async fetchData() {
      return await getBlogCategories();
    },
    handleSelect(item) {
      const query = {
        page: 1,
        limit: this.routeInfo.limit,
      };

      // 判断选中的分类是否为“全部”选项，若不是便跳到对应分类页
      if (item.id === -1) {
        // 选中的为“全部”选项
        this.$router.push({
          name: "blog",
          query,
        });
      } else {
        // 选中的为其它分类选项
        this.$router.push({
          name: "blogCategory",
          query,
          params: {
            categoryId: item.id,
          }
        });
      }
    },
  },
  computed: {
    routeInfo() {
      const categoryId = +this.$route.params.categoryId || -1;
      const limit = +this.$route.query.limit || 10;
      return {
        categoryId,
        limit,
      };
    },
    /**
     * 产生HierarchyList组件用于渲染的数据的函数
     */
    lists() {
      const totalArticleCount = this.data.reduce(
        (a, b) => a + b.articleCount,
        0
      );

      // 给结果数组加上一项“全部”项
      const result = [
        { name: "全部", id: -1, articleCount: totalArticleCount },
        ...this.data,
      ];
      
      return result.map((item) => ({
        ...item,
        isSelected: item.id === this.routeInfo.categoryId,
        aside: `${item.articleCount}篇`,
      }));
    },
  },
};
</script>

<style lang="less" scoped>
.blog-category-container {
  position: relative;
  width: 300px;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;

  h2 {
    margin: 0;
    font-weight: bold;
    font-size: 1em;
    letter-spacing: 2px;
  }
}
</style>