<template>
  <div class="project-container" v-loading="loading" ref="container">
    <div class="project-item" v-for="item in data" :key="item.id">
      <a
        :href="
          item.url ? item.url : `javascript: alert('该项目无法通过外网访问')`
        "
        :target="item.url ? '_blank' : '_self'"
      >
        <img class="thumb" v-lazy="item.thumb" />
      </a>
      <div class="info">
        <h2>
          <a
            :href="
              item.url
                ? item.url
                : `javascript: alert('该项目无法通过外网访问')`
            "
            :target="item.url ? '_blank' : '_self'"
          >
            {{ item.cname }}
          </a>
        </h2>
        <a
          class="github"
          :href="item.github"
          v-if="item.github"
          target="_blank"
        >
          github
        </a>
        <p v-for="(desc, i) in item.description" :key="i">
          {{ desc }}
        </p>
      </div>
    </div>
    <Empty v-if="data.length === 0 && !loading" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import backTopMainScroll from "@/mixins/backTopMainScroll";
import Empty from "@/components/Empty";

export default {
  mixins: [backTopMainScroll("container")],
  components: {
    Empty,
  },
  computed: mapState("project", ["loading", "data"]),
  created() {
    this.$store.dispatch("project/fetchProject");
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

.project-container {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  scroll-behavior: smooth;

  .project-item {
    display: flex;
    padding: 20px;
    margin-bottom: 20px;
    transition: all 0.5s;

    &:hover {
      color: inherit;
      box-shadow: -1px 1px 5px #000;
      transform: scale(1.01) translate(3px, -3px);
    }

    .thumb {
      width: 250px;
      min-height: 150px;
      margin-right: 15px;
      border-radius: 5px;
      flex: 0 0 auto;
      object-fit: cover;
    }

    .info {
      line-height: 1.7;
      flex: 1 1 auto;

      h2 {
        margin: 0;
      }

      .github {
        font-size: 14px;
        color: @primary;
      }
    }
  }
}
</style>