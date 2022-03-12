<template>
  <Layout>
    <div class="main-container" v-loading="isLoading" ref="mainContainer">
      <BlogContent :blog="data" v-if="data" />
      <BlogComment v-if="!isLoading" />
    </div>
    <template #right>
      <div class="right-container" v-loading="isLoading">
        <BlogTOC :toc="data.toc" v-if="data" />
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout";
import BlogContent from "./components/BlogContent.vue";
import BlogTOC from "./components/BlogTOC.vue";
import fetchData from "@/mixins/fetchData";
import { getBlog } from "@/api/blog";
import BlogComment from "./components/BlogComment.vue";
import backTopMainScroll from "@/mixins/backTopMainScroll";
import { titleController } from "@/utils";

export default {
  mixins: [fetchData(null), backTopMainScroll("mainContainer")],
  components: {
    Layout,
    BlogContent,
    BlogTOC,
    BlogComment,
  },
  methods: {
    async fetchData() {
      let res = await getBlog(this.$route.params.id);
      if (!res) {
        this.$router.push("/404");
        return;
      }

      titleController.setRouteTitle(res.title);
      return res;
    },
  },
  updated() {
    const hash = location.hash;
    location.hash = "";
    setTimeout(() => {
      location.hash = hash;
    }, 50);
  },
};
</script>

<style lang="less" scoped>
.main-container {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

.right-container {
  position: relative;
  width: 300px;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: scroll;
}
</style>