<template>
  <div class="product-add-container">
    <a-steps :current="current" class="product-steps">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <BasicInfo v-if="current === 0" @next="next" :form="form" />
      <DetailedInfo
        v-else-if="current === 1"
        @next="next"
        @prev="prev"
        :form="form"
      />
    </div>
  </div>
</template>

<script>
import BasicInfo from "./BasicInfo";
import DetailedInfo from "./DetailedInfo";
import { addProduct, getProductDetail, editProduct } from "@/api/product";

export default {
  components: {
    BasicInfo,
    DetailedInfo,
  },
  data() {
    return {
      current: 0,
      steps: [{ title: "填写商品基本信息" }, { title: "填写商品销售信息" }],
      form: {
        title: "",
        desc: "",
        category: undefined,
        c_items: [],
        tags: undefined,
        price: 0,
        price_off: 0,
        unit: "",
        inventory: 0,
        images: [],
      },
    };
  },
  methods: {
    next(form) {
      this.form = {
        ...this.form,
        form,
      };

      if (this.current === this.steps.length - 1) {
        if (this.$route.params.id) {
          editProduct(this.form).then(
            (res) => {
              this.$message.success("编辑商品成功！");
              this.$router.push({ name: "ProductList" });
            },
            (err) => {
              console.log(err);
              this.$message.error("编辑商品失败！");
            }
          );
        } else {
          addProduct(this.form).then(
            (res) => {
              this.$message.success("新增商品成功！");
              this.$router.push({ name: "ProductList" });
            },
            (err) => {
              console.log(err);
              this.$message.error("新增商品失败！");
            }
          );
        }
      } else {
        this.current++;
      }
    },
    prev() {
      this.current--;
    },
  },
  created() {
    if (this.$route.params.id) {
      getProductDetail(this.$route.params.id).then((res) => {
        this.form = res;
        this.form.c_items = res.c_item;
        delete this.form.c_item;
      });
    }
  },
};
</script>

<style lang="less" scoped>
.product-add-container {
  .product-steps {
    width: 60%;
    margin: 20px auto;
  }

  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    padding-top: 80px;
  }
}
</style>
