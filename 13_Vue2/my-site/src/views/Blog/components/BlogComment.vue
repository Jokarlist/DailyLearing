<template>
  <div class="blog-comment-container">
    <MessageArea
      :list="data.rows"
      title="评论列表"
      :subtitle="`(${data.total})`"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData";
import refreshMainScroll from "@/mixins/refreshMainScroll";
import { getComments, postComment } from "@/api/blog";

export default {
  mixins: [fetchData({ total: 0, rows: [] }), refreshMainScroll(getComments)],
  components: {
    MessageArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  methods: {
    async fetchData() {
      return await getComments(this.page, this.limit, this.$route.params.id);
    },
    async handleSubmit(formData, callback) {
      const res = await postComment({
        ...formData,
        blogId: this.$route.params.id,
      });

      this.data.rows.unshift(res);
      this.data.total++;
      callback("评论成功");
    },
  },
};
</script>

<style lang="less" scoped>
.blog-comment-container {
  margin: 30px 0;
}
</style>