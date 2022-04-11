<template>
  <div class="product-list-container">
    <Search :categoryList="categoryList" @submit="handleSearchSubmit" />
    <a-button class="product-add-btn">
      <router-link :to="{ name: 'ProductAdd' }">新增商品</router-link>
    </a-button>
    <Table
      :data="tableData"
      @change="handleChangePage"
      :pagination="pagination"
      @edit="handleProductEdit"
      @confirm="handleConfirm"
    />
  </div>
</template>

<script>
import Search from "../Search";
import Table from "../Table";
import * as productAPI from "@/api/product";

export default {
  components: {
    Search,
    Table,
  },
  data() {
    return {
      searchForm: {},
      categoryList: [],
      tableData: [],
      categoryNameMap: {},
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
      },
    };
  },
  methods: {
    handleSearchSubmit(form) {
      this.searchForm = form;
      this.fetchProductList();
    },
    fetchProductList() {
      productAPI
        .getProductList({
          page: this.pagination.current,
          size: this.pagination.pageSize,
          ...this.searchForm,
        })
        .then((res) => {
          this.tableData = res.data.map((item) => ({
            ...item,
            category: this.categoryNameMap[item.category],
          }));
          this.pagination.total = +res.total;
        });
    },
    handleChangePage({ current, pageSize }) {
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.fetchProductList();
    },
    handleProductEdit(record) {
      this.$router.push({
        name: "ProductEdit",
        params: {
          id: record.id,
        },
      });
    },
    handleConfirm(record) {
      productAPI.deleteProduct(record.id).then(
        () => this.fetchProductList(),
        (err) => console.log(err)
      );
    },
  },
  created() {
    productAPI.getCategoryList().then((res) => {
      this.categoryList = res.data;
      res.data.forEach((item) => (this.categoryNameMap[item.id] = item.name));
      this.fetchProductList();
    });
  },
};
</script>

<style lang="less" scoped>
.product-list-container {
  position: relative;

  .product-add-btn {
    position: absolute;
    top: 14px;
    right: 20px;
  }
}
</style>
