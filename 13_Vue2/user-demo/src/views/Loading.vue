<template>
  <h1>正在登录中...</h1>
</template>

<script>
export default {
  created() {
    this.unwatch = this.$watch(
      () => this.$store.getters["loginUser/status"],
      (status) => {
        if (status !== "loading") {
          this.$router
            .push({
              path: this.$route.query.desturl ?? "/home",
            })
            .catch(() => {});
        }
      },
      {
        immediate: true,
      }
    );
  },
  destroyed() {
    this.unwatch();
  },
};
</script>

<style>
</style>