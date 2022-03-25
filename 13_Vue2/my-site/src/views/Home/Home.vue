<template>
  <div class="home-container" ref="container" v-loading="loading">
    <ul
      class="carousel-container"
      :style="{ marginTop }"
      @wheel="handleWheel"
      @transitionend="handleTransitionEnd"
    >
      <li v-for="item in data" :key="item.id">
        <CarouselItem :carousel="item" />
      </li>
    </ul>
    <div class="icon icon-up" @click="switchTo(index - 1)" v-show="index >= 1">
      <Icon type="arrowUp" />
    </div>
    <div
      class="icon icon-down"
      @click="switchTo(index + 1)"
      v-show="index < data.length - 1"
    >
      <Icon type="arrowDown" />
    </div>
    <ul class="indicator">
      <li
        v-for="(item, i) in data"
        :key="item.id"
        @click="switchTo(i)"
        :class="{ active: index === i }"
      ></li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CarouselItem from "./CarouselItem.vue";
import Icon from "@/components/Icon";

export default {
  components: {
    CarouselItem,
    Icon,
  },
  data() {
    return {
      // 指示当前的轮播图页
      index: 0,
      // 主容器的当前高度
      containerHeight: 0,
      // 指示轮播图是否处于切换状态
      switching: false,
    };
  },
  computed: {
    marginTop() {
      return -this.index * this.containerHeight + "px";
    },
    ...mapState("banner", ["loading", "data"]),
  },
  methods: {
    switchTo(index) {
      this.index = index;
    },
    handleWheel(e) {
      if (this.switching) {
        return;
      }

      if (e.deltaY > 0 && this.index < this.data.length - 1) {
        this.switching = true;
        this.index++;
      } else if (e.deltaY < 0 && this.index > 0) {
        this.switching = true;
        this.index--;
      }
    },
    handleTransitionEnd() {
      this.switching = false;
    },
    handleResize() {
      this.containerHeight = this.$refs.container.clientHeight;
    },
  },
  created() {
    this.$store.dispatch("banner/fetchBanner");
  },
  mounted() {
    this.containerHeight = this.$refs.container.clientHeight;
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";

.home-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  // 用于测试
  /* width: 60%;
  height: 40%;
  margin: 100px auto;
  overflow: visible;
  border: 2px solid #f40; */

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .carousel-container {
    width: 100%;
    height: 100%;
    transition: all 0.5s;

    li {
      width: 100%;
      height: 100%;
    }
  }

  .icon {
    .self-center();
    @gap: 20px;
    font-size: 30px;
    color: @gray;
    cursor: pointer;
    transform: translateX(-50%);

    &.icon-up {
      top: @gap;
      animation: icon-up-jump 2s infinite;
    }

    &.icon-down {
      top: auto;
      bottom: @gap;
      animation: icon-down-jump 2s infinite;
    }

    @jump: 5px;
    @keyframes icon-down-jump {
      0% {
        transform: translate(-50%, @jump);
      }
      50% {
        transform: translate(-50%, -@jump);
      }
      100% {
        transform: translate(-50%, @jump);
      }
    }

    @keyframes icon-up-jump {
      0% {
        transform: translate(-50%, -@jump);
      }
      50% {
        transform: translate(-50%, @jump);
      }
      100% {
        transform: translate(-50%, -@jump);
      }
    }
  }

  .indicator {
    .self-center();
    left: auto;
    right: 20px;
    transform: translateY(-50%);

    li {
      width: 7px;
      height: 7px;
      margin-bottom: 10px;
      background: @words;
      border: 1px solid #fff;
      border-radius: 50%;
      box-sizing: border-box;
      cursor: pointer;

      &.active {
        background: #fff;
      }
    }
  }
}
</style>
