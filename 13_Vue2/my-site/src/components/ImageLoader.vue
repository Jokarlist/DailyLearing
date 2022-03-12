<template>
  <div class="image-loader-container">
    <img
      :src="placeholder"
      v-if="!removeFlag"
      alt="占位图片"
      class="placeholder"
    />
    <img
      :src="src"
      :style="{ opacity: originOpacity, transition: `${duration}ms` }"
      @load="handleLoad"
      alt="原始图片"
    />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      originLoaded: false,
      removeFlag: false,
    };
  },
  computed: {
    originOpacity() {
      return this.originLoaded ? 1 : 0;
    },
  },
  methods: {
    handleLoad() {
      this.originLoaded = true;
      setTimeout(() => {
        this.removeFlag = true;
      }, this.duration);
      this.$emit("load");
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";

.image-loader-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
    .self-fill();
    object-fit: cover;
  }

  .placeholder {
    filter: blur(2vw);
  }
}
</style>