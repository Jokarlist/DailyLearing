<template>
  <div class="blog-list-container" ref="container" v-loading="isLoading">
    <ul>
      <li v-for="item in data.rows" :key="item.id">
        <div class="thumb" v-if="item.thumb">
          <RouterLink
            :to="{
              name: 'blogDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <img v-lazy="item.thumb" :alt="item.title" :title="item.title" />
          </RouterLink>
        </div>
        <div class="main">
          <RouterLink
            :to="{
              name: 'blogDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <h2>{{ item.title }}</h2>
          </RouterLink>
          <div class="aside">
            <span>日期：{{ formatDate(item.createDate) }}</span>
            <span>浏览：{{ item.viewNumber }}</span>
            <span>评论{{ item.commentNumber }}</span>
            <RouterLink
              :to="{
                name: 'blogCategory',
                params: {
                  categoryId: item.category.id,
                },
              }"
              >{{ item.category.name }}</RouterLink
            >
          </div>
          <div class="desc">{{ item.description }}</div>
        </div>
      </li>
    </ul>
    <Empty v-if="data.rows.length === 0 && !isLoading" />
    <!-- 放置分页处 -->
    <Pager
      v-if="data.total"
      @pageChange="handlePageChange"
      :current="routeInfo.page"
      :limit="routeInfo.limit"
      :total="data.total"
      :visibleNumber="10"
    />
  </div>
</template>

<script>
import { getBlogs } from "@/api/blog";
import fetchData from "@/mixins/fetchData";
import { formatDate } from "@/utils";
import Pager from "@/components/Pager";
import backTopMainScroll from "@/mixins/backTopMainScroll";
import Empty from "@/components/Empty";

export default {
  mixins: [fetchData({ total: 0, rows: [] }), backTopMainScroll("container")],
  components: {
    Pager,
    Empty,
  },
  computed: {
    // 获取路由信息
    routeInfo() {
      const categoryId = +this.$route.params.categoryId || -1;
      const page = +this.$route.query.page || 1;
      const limit = +this.$route.query.limit || 10;
      return {
        categoryId,
        page,
        limit,
      };
    },
  },
  methods: {
    formatDate,
    async fetchData() {
      return await getBlogs(
        this.routeInfo.page,
        this.routeInfo.limit,
        this.routeInfo.categoryId
      );
    },
    handlePageChange(newPage) {
      const query = {
        page: newPage,
        limit: this.routeInfo.limit,
      };

      // 判断页码改变后路由信息中是否表明要跳到指定的分类页
      if (this.routeInfo.categoryId === -1) {
        // 不用分类页
        this.$router.push({
          name: "blog",
          query,
        });
      } else {
        // 要分类
        this.$router.push({
          name: "blogCategory",
          query,
          params: {
            categoryId: this.routeInfo.categoryId,
          },
        });
      }
    },
  },
  watch: {
    async $route() {
      this.isLoading = true;
      this.$refs.container.scrollTop = 0;
      this.data = await this.fetchData();
      this.isLoading = false;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

.blog-list-container {
  position: relative;
  padding: 20px;
  width: 100%;
  height: 100%;
  line-height: 1.7;
  box-sizing: border-box;
  overflow-y: auto;
  scroll-behavior: smooth;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      display: flex;
      padding: 15px 0;
      border-bottom: 1px solid @gray;

      .thumb {
        flex: 0 0 auto;
        margin-right: 15px;

        img {
          display: block;
          max-width: 200px;
          border-radius: 5px;
        }
      }

      .main {
        flex: 1 1 auto;

        h2 {
          margin: 0;
        }

        .aside {
          font-size: 12px;
          color: @gray;

          span {
            margin-right: 15px;
          }
        }

        .desc {
          margin: 15px 0;
          font-size: 14px;
        }
      }
    }
  }
}
</style>