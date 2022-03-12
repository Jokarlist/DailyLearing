/**
 * 统一处理模块滑动到底部需要加载更多数据的需求
 * @param {function} fetchFunc 刷新时获取更多数据的接口方法
 */
export default function (fetchFunc) {
  return {
    computed: {
      hasMore() {
        return this.data.total >= this.data.rows.length;
      },
    },
    methods: {
      handleRefreshMainScroll(dom) {
        if (!dom || this.isLoading) {
          return;
        }

        // 限制一个范围，在这个范围内判定为容器已经滚动到底
        const range = 100;
        const flag =
          dom.scrollHeight - (dom.clientHeight + dom.scrollTop) <= range;
        flag && this.fetchMore();
      },
      async fetchMore() {
        if (!this.hasMore) {
          return;
        }

        this.isLoading = true;
        this.page++;
        const moreData = await fetchFunc(this.page, this.limit);
        this.data.rows = [...this.data.rows, ...moreData.rows];
        this.isLoading = false;
      },
    },
    created() {
      this.$bus.$on("mainScroll", this.handleRefreshMainScroll);
    },
    destroyed() {
      this.$bus.$off("mainScroll", this.handleRefreshMainScroll);
    },
  };
}
