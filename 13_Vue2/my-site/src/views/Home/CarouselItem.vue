<template>
  <div
    class="carousel-item-container"
    ref="container"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div class="carousel-img" ref="image" :style="imagePosition">
      <ImageLoader
        :src="carousel.bigImg"
        :placeholder="carousel.midImg"
        @load="showWords"
      />
    </div>
    <div class="title" ref="title">{{ carousel.title }}</div>
    <div class="desc" ref="desc">{{ carousel.description }}</div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";

export default {
  props: ["carousel"],
  components: {
    ImageLoader,
  },
  data() {
    return {
      titleWidth: 0,
      descWidth: 0,
      // 最外层容器的尺寸
      containerSize: null,
      // 内层图片容器的尺寸
      innerSize: null,
      // 鼠标相对图片容器的落点x位置
      mouseX: 0,
      // 鼠标相对图片容器的落点y位置
      mouseY: 0,
    };
  },
  mounted() {
    this.titleWidth = this.$refs.title.clientWidth;
    this.descWidth = this.$refs.desc.clientWidth;
    this.setSize();
    this.mouseX = this.initCenter.x;
    this.mouseY = this.initCenter.y;
    window.addEventListener("resize", this.setSize);
  },
  destroyed() {
    window.removeEventListener("resize", this.setSize);
  },
  computed: {
    // 获取图片放置坐标
    imagePosition() {
      if (!this.innerSize || !this.containerSize) {
        return;
      }

      const extraWidth = this.innerSize.width - this.containerSize.width;
      const extraHeight = this.innerSize.height - this.containerSize.height;
      const left = (-extraWidth / this.containerSize.width) * this.mouseX;
      const top = (-extraHeight / this.containerSize.height) * this.mouseY;
      return {
        transform: `translate(${left}px, ${top}px)`,
      };
    },
    // 初始化正中间位置
    initCenter() {
      return {
        x: this.containerSize.width / 2,
        y: this.containerSize.height / 2,
      };
    },
  },
  methods: {
    handleMouseMove(e) {
      const rect = this.$refs.container.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    },
    handleMouseLeave() {
      this.mouseX = this.initCenter.x;
      this.mouseY = this.initCenter.y;
    },
    // 获取各种尺寸
    setSize() {
      this.containerSize = {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight,
      };
      this.innerSize = {
        width: this.$refs.image.clientWidth,
        height: this.$refs.image.clientHeight,
      };
    },
    // 显示图片附带的标题和描述内容
    showWords() {
      const title = this.$refs.title;
      const desc = this.$refs.desc;
      title.style.width = 0;
      title.style.opacity = 1;
      title.clientWidth;
      title.style.transition = "all 1s";
      title.style.width = this.titleWidth + "px";

      desc.style.width = 0;
      desc.style.opacity = 1;
      desc.clientWidth;
      desc.style.transition = "all 2s 1s";
      desc.style.width = this.descWidth + "px";
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

.carousel-item-container {
  position: relative;
  width: 100%;
  height: 100%;
  color: #fff;
  overflow: hidden;

  .carousel-img {
    position: absolute;
    left: 0;
    top: 0;
    width: 110%;
    height: 110%;
    transition: all 0.3s;
  }

  .title,
  .desc {
    position: absolute;
    left: 30px;
    letter-spacing: 3px;
    text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5),
      0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5);
    white-space: nowrap;
    overflow: hidden;
    opacity: 0;
  }

  .title {
    top: calc(50% - 40px);
    font-size: 2em;
  }

  .desc {
    top: calc(50% + 20px);
    font-size: 1.2em;
    color: lighten(@gray, 10%);
  }
}
</style>
