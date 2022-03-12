<template>
  <ul class="data-list-container">
    <li v-for="item in list" :key="item.id">
      <Avatar :src="item.avatar" :size="44" />
      <div class="data">
        <div class="nickname">{{ item.nickname }}</div>
        <div class="content">{{ item.content }}</div>
        <div class="date">{{ formatDate(item.createDate, true) }}</div>
      </div>
    </li>
  </ul>
</template>

<script>
import Avatar from "@/components/Avatar";
import { formatDate } from "@/utils";

export default {
  components: {
    Avatar,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    formatDate,
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

.data-list-container {
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    display: flex;
    padding: 15px 0;
    border-bottom: 1px solid lighten(@gray, 20%);

    .avatar-container {
      margin-right: 15px;
    }

    .nickname {
      margin-bottom: 10px;
      color: darken(@success, 10%);
    }

    .content {
      font-size: 14px;
    }

    .data {
      position: relative;
      flex: 1 1 auto;
    }

    .date {
      position: absolute;
      right: 0;
      top: 5px;
      font-size: 12px;
      color: @gray;
    }
  }
}
</style>