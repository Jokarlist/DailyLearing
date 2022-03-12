<template>
  <Layout>
    <!-- <template #main> -->
    <BlogList />
    <!-- </template> -->
    <template #right>
      <BlogCategory />
    </template>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout";
import HierarchyList from "./components/HierarchyList";
import BlogList from "./components/BlogList";
import BlogCategory from "./components/BlogCategory";

export default {
  components: {
    Layout,
    HierarchyList,
    BlogList,
    BlogCategory,
  },
};
</script>

<style>
</style>