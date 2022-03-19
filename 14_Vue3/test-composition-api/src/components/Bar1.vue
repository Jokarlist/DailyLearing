<script>
import useGdp from "../composition/useGdp";
import { ref } from "vue";

export default {
  props: ["gdp"],
  setup(props) {
    // const gdp = computed(() => props.gdp);
    return {
      ...useGdp(ref(props.gdp), 400),
    };
  },
};
</script>

<template>
  <div class="bar1">
    <div class="item" v-for="item in bars" :key="item.country">
      <label>{{ item.country }}</label>
      <div
        class="bar"
        :style="{ background: item.color, width: item.width + 'px' }"
      ></div>
      <div class="value">{{ item.value }}万亿</div>
    </div>
  </div>
</template>

<style scoped>
.bar1 {
  width: 500px;
  box-sizing: border-box;
  margin: 3em;
  border-left: 1px solid #333;
}
.item {
  display: flex;
  height: 35px;
  line-height: 35px;
  margin: 1em 0;
  position: relative;
}
.bar {
  width: 100px;
  height: 100%;
  margin-right: 1em;
  flex: 0 0 auto;
}
.item label {
  position: absolute;
  left: -50px;
}
.value {
  flex: 0 0 auto;
}
</style>
