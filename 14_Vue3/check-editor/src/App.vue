<template>
  <div class="container">
    <div class="list">
      <strong>编辑：</strong>
      <div class="list">
        <CheckEditor
          v-for="item in products"
          :key="item.id"
          v-model="item.sell"
          v-model:title.trim="item.title"
        />
      </div>
    </div>
    <div class="list">
      <strong>销售中：</strong>
      <div>
        <template v-for="(item, i) in onSellProducts" :key="item.id">
          <span>{{ i + 1 }}.</span>
          <strong>{{ item.title }}</strong>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import CheckEditor from "./components/checkEditor.vue";
import { ref, computed } from "vue";

const products = [
  { id: 1, sell: true, title: "apple" },
  { id: 2, sell: false, title: "samsung" },
  { id: 3, sell: true, title: "huawei" },
  { id: 4, sell: true, title: "xiaomi" },
];

export default {
  components: {
    CheckEditor,
  },
  setup() {
    const productsRef = ref(products);
    const onSellProducts = computed(() =>
      productsRef.value.filter((item) => item.sell)
    );

    return {
      products: productsRef,
      onSellProducts,
    };
  },
};
</script>

<style scoped>
.container {
  width: 880px;
  margin-top: 8px;
  margin: 50px auto;
}

.list {
  display: flex;
  align-items: center;
  margin: 1em 0;
}

strong {
  margin-right: 1em;
  white-space: nowrap;
}
</style>
