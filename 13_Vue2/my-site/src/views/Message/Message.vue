<template>
  <div class="message-container" ref="container">
    <MessageArea
      title="留言板"
      :subtitle="`(${data.total})`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData";
import refreshMainScroll from "@/mixins/refreshMainScroll";
import backTopMainScroll from "@/mixins/backTopMainScroll";
import { getMessages, postMessage } from "@/api/message";

export default {
  mixins: [
    fetchData({ total: 0, rows: [] }),
    backTopMainScroll("container"),
    refreshMainScroll(getMessages),
  ],
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
      return await getMessages(this.page, this.limit);
    },
    async handleSubmit(data, callback) {
      const res = await postMessage(data);
      callback("感谢您的留言！");
      this.data.rows.unshift(res);
    },
  },
};
</script>

<style lang="less" scoped>
.message-container {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  scroll-behavior: smooth;

  .message-area-container {
    width: 700px;
    margin: 0 auto;
  }
}
</style>