/**
 * 统一处理mainScroll和setMainScroll事件
 * @param {string} refValue $refs属性获得的相关容器
 */
export default function (refValue) {
  return {
    methods: {
      handleMainScroll() {
        this.$bus.$emit("mainScroll", this.$refs[refValue]);
      },
      handleSetMainScroll(scrollTop) {
        this.$refs[refValue].scrollTop = scrollTop;
      },
    },
    mounted() {
      this.$bus.$on("setMainScroll", this.handleSetMainScroll);
      this.$refs[refValue].addEventListener("scroll", this.handleMainScroll);
    },
    beforeDestroy() {
      this.$bus.$emit("mainScroll");
      this.$bus.$off("setMainScroll", this.handleSetMainScroll);
      this.$refs[refValue].removeEventListener("scroll", this.handleMainScroll);
    },
  };
}
