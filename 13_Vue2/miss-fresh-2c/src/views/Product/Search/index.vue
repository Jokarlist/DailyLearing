<template>
  <div class="search-container">
    <a-form-model
      layout="inline"
      :model="searchForm"
      @submit="handleSubmit"
      @submit.native.prevent
    >
      <a-form-model-item label="检索关键字">
        <a-input
          v-model="searchForm.searchWord"
          placeholder="请输入关键字"
          style="width: 150px"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item label="商品类目">
        <a-select
          style="width: 150px"
          @change="handleChange"
          placeholder="请选择商品类目"
          allowClear
        >
          <a-select-option
            v-for="c in categoryList"
            :key="c.id"
            :value="c.id"
            >{{ c.name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" html-type="submit">搜索</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  props: {
    categoryList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      searchForm: {
        searchWord: "",
        category: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("submit", this.searchForm);
    },
    handleChange(value) {
      this.searchForm.category = value;
    },
  },
};
</script>

<style scoped>
.search-container {
  padding: 10px 30px;
}
</style>