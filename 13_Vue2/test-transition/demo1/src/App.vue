<template>
  <div id="app">
    <div class="container">
      <div class="btns">
        <button @click="prev">prev</button>
        <button @click="next">next</button>
      </div>
      <transition :name="`${direction}-image`">
        <img class="image" :src="curImage" :key="curIndex" />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      images: [
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F3b0ce38d21909df5b8b8559b750f445d7f0dc239.jpg",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_match%2F0%2F7846070549%2F0",
        "https://img0.baidu.com/it/u=1650305178,3598934421&fm=253",
        "https://img2.baidu.com/it/u=2508611608,3658485126&fm=253",
      ],
      curIndex: 0,
      direction: "next",
    };
  },
  computed: {
    curImage() {
      return this.images[this.curIndex];
    },
    maxIndex() {
      return this.images.length - 1;
    },
  },
  methods: {
    next() {
      this.curIndex++;
      if (this.curIndex > this.maxIndex) {
        this.curIndex = 0;
      }

      this.direction = "next";
    },
    prev() {
      this.curIndex--;
      if (this.curIndex < 0) {
        this.curIndex = this.maxIndex;
      }

      this.direction = "prev";
    },
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;

  .container {
    text-align: center;

    .btns button {
      margin: 1em 0.5em;
    }

    .image {
      position: absolute;
      left: calc(50% - 100px);
      top: 100px;
      width: 200px;
      height: 200px;
      border-radius: 50%;
    }

    .next-image-enter,
    .prev-image-leave-to {
      opacity: 0;
      transform: translateX(150px);
    }

    .next-image-leave-to,
    .prev-image-enter {
      opacity: 0;
      transform: translateX(-150px);
    }

    .next-image-enter-active,
    .next-image-leave-active,
    .prev-image-enter-active,
    .prev-image-leave-active {
      transition: 0.5s;
    }
  }
}
</style>
