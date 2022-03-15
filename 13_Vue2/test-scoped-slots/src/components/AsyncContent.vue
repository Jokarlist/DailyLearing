<template>
  <div>
    <slot name="loading" v-if="loading">默认加载中的效果...</slot>
    <slot name="error" v-else-if="error" v-bind:error="error">{{ error }}</slot>
    <slot name="default" v-else :data="data">{{ data }}</slot>
  </div>
</template>

<script>
export default {
  props: {
    contentPromise: Promise,
  },
  data() {
    return {
      loading: true,
      data: null,
      error: null,
    };
  },
  async created() {
    try {
      this.data = await this.contentPromise;
      this.error = null;
    } catch (err) {
      this.error = err;
      this.data = null;
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style>
</style>