<template>
  <div
    class="recycle-scroller-container"
    ref="container"
    @scroll="setRenderPool"
  >
    <div class="recycle-scroller-wrapper" :style="{ height: `${totalSize}px` }">
      <div
        class="recycle-scroller-item"
        v-for="item in renderPool"
        :key="item.item[keyField]"
        :style="{ transform: `translateY(${item.position}px)` }"
      >
        <slot v-bind:item="item.item"></slot>
      </div>
    </div>
  </div>
</template>

<script>
// 每个列表项的前后都放置多15个元素，手动弥补拖动进度条过快而造成渲染来不及的效果
const prev = 15;
const next = 15;

export default {
  props: {
    // 传入的数据数组
    items: {
      type: Array,
      default: () => [],
    },
    // 每个列表项元素的高度
    itemSize: {
      type: Number,
      default: 0,
    },
    // 遍历数据数组时每一项唯一且稳定的key值来源名
    keyField: {
      type: String,
      default: "id",
    },
  },
  data() {
    return {
      // 渲染池（即列表项数组）
      renderPool: [],
    };
  },
  computed: {
    // 列表父容器总高度
    totalSize() {
      return this.items.length * this.itemSize;
    },
  },
  methods: {
    // 设置渲染池中的列表项数组
    setRenderPool() {
      const container = this.$refs.container;
      // 渲染起始元素在数组中的索引值
      let startIndex = Math.floor(container.scrollTop / this.itemSize);
      // 渲染结束元素在数组中的索引值
      let endIndex = Math.ceil(
        (container.scrollTop + container.clientHeight) / this.itemSize
      );
      // 渲染起始元素的位置
      const startPos = startIndex * this.itemSize;
      startIndex -= prev;
      if (startIndex < 0) {
        startIndex = 0;
      }

      endIndex += next;
      this.renderPool = this.items
        .slice(startIndex, endIndex)
        .map((item, i) => ({
          item,
          position: startPos + i * this.itemSize,
        }));
    },
  },
  mounted() {
    this.setRenderPool();
  },
};
</script>

<style>
.recycle-scroller-container {
  overflow: auto;
}

.recycle-scroller-wrapper {
  position: relative;
}

.recycle-scroller-item {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
</style>