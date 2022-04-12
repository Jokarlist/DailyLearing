<template>
  <div class="basic-info-container">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-model-item label="商品标题" prop="title">
        <a-input
          v-model="form.title"
          type="text"
          placeholder="请填写商品标题"
        />
      </a-form-model-item>
      <a-form-model-item label="商品描述" prop="desc">
        <a-input
          v-model="form.desc"
          type="textarea"
          placeholder="请填写商品描述信息"
        />
      </a-form-model-item>
      <a-form-model-item label="商品类目" prop="category">
        <a-select
          v-model="form.category"
          placeholder="请选择类目"
          @change="handleCategoryChange"
        >
          <a-select-option
            v-for="c in categoryList"
            :key="c.id"
            :value="c.id"
            >{{ c.name }}</a-select-option
          >
        </a-select>
        <a-select v-model="form.c_items" placeholder="请选择所属子类目">
          <a-select-option v-for="c in categoryItems" :key="c" :value="c">{{
            c
          }}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品标签" prop="tags">
        <a-select
          mode="tags"
          placeholder="请添加标签"
          :default-value="['包邮，最晚次日达']"
          v-model="form.tags"
        >
          <a-select-option value="包邮，最晚次日达"
            >包邮，最晚次日达</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 22 }" class="next-btn">
        <a-button type="primary" @click="next">下一步</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import * as productAPI from "@/api/product";

export default {
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      rules: {
        title: [
          { required: true, message: "商品标题必须填写", trigger: "blur" },
        ],
        category: [
          { required: true, message: "商品类目必须选择", trigger: "change" },
        ],
        tags: [
          { required: true, message: "商品标签至少有一个", trigger: "blur" },
        ],
      },
      categoryList: [],
      categoryItems: [],
    };
  },
  methods: {
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit("next", this.form);
          return true;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleCategoryChange(category) {
      this.categoryItems = this.categoryList[category - 1].c_items;
    },
  },
  created() {
    productAPI.getCategoryList().then((res) => (this.categoryList = res.data));
  },
};
</script>

<style scoped>
.next-btn {
  text-align: center;
}
</style>
