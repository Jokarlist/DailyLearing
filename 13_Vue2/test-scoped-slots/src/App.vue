<template>
  <div id="app">
    <async-content :contentPromise="fetchProducts()">
      <template #loading>加载中...</template>
      <template v-slot:default="{ data }">
        <ul>
          <li v-for="item in data" :key="item.id">
            商品名：{{ item.brand }} 库存：{{ item.stock }}
          </li>
        </ul>
      </template>
      <template v-slot:error="{ error }">
        <p style="color: #f00">{{ error.message }}</p>
      </template>
    </async-content>
  </div>
</template>

<script>
import AsyncContent from "./components/AsyncContent";

function getProducts() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve([
          { id: 1, brand: "apple", stock: 500 },
          { id: 2, brand: "huawei", stock: 1000 },
          { id: 3, brand: "xiaomi", stock: 1500 },
        ]);
      } else {
        reject(new Error("Resource Not Found"));
      }
    }, 1000);
  });
}

export default {
  name: "App",
  components: {
    AsyncContent,
  },
  methods: {
    async fetchProducts() {
      return await getProducts();
    },
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width: 500px;
  padding: 20px;
  margin: 1em auto;
  border: 1px solid #ccc;
}
</style>
