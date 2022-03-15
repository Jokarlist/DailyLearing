<template>
  <div id="app">
    <RecycleScroller
      class="scroller"
      :items="items"
      :itemSize="54"
      v-slot="{ item }"
    >
      <ListItem :item="item" />
    </RecycleScroller>
  </div>
</template>

<script>
import RecycleScroller from "./components/RecycleScroller.vue";
import ListItem from "./components/ListItem.vue";

const items = [];
for (let i = 0; i < 10000; i++) {
  items.push({
    id: i + 1,
    count: i + 1,
  });
}

export default {
  name: "App",
  components: {
    RecycleScroller,
    ListItem,
  },
  data() {
    return {
      items,
    };
  },
};
</script>

<style lang="less">
#app {
  width: 100%;
  margin: 0 auto;
}

.scroller {
  width: 500px;
  height: 500px;
  margin: 0 auto;
}
</style>
