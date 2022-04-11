<template>
  <div class="table-container">
    <a-table
      :columns="columns"
      :data-source="tableData"
      :pagination="pagination"
      @change="handleChangePage"
      :scroll="{ x: false, y: 500 }"
    >
      <div slot="operation" slot-scope="text, record" class="operation">
        <a-button @click="handleProductEdit(record)">编辑</a-button>
        <a-popconfirm
          title="你确定要删除此商品吗?"
          ok-text="确定"
          cancel-text="点错了"
          @confirm="handleConfirm(record)"
        >
          <a-button>删除</a-button>
        </a-popconfirm>
      </div>
    </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: "ID",
    align: "center",
    dataIndex: "id",
    width: "100px",
  },
  {
    title: "标题",
    align: "center",
    dataIndex: "title",
    ellipsis: true,
  },
  {
    title: "描述",
    align: "center",
    dataIndex: "desc",
    ellipsis: true,
  },
  {
    title: "类目",
    align: "center",
    dataIndex: "category",
    width: "100px",
  },
  {
    title: "预售价格",
    align: "center",
    dataIndex: "price",
    width: "100px",
  },
  {
    title: "折扣价格",
    align: "center",
    dataIndex: "price_off",
    width: "100px",
  },
  {
    title: "标签",
    align: "center",
    dataIndex: "tags",
  },
  {
    title: "限制购买数量",
    align: "center",
    dataIndex: "inventory",
    width: "120px",
  },
  {
    title: "上架状态",
    align: "center",
    dataIndex: "status",
    customRender(text, record) {
      return record.status === 1 ? "上架" : "下架";
    },
  },
  {
    title: "操作",
    align: "center",
    dataIndex: "operation",
    width: "180px",
    scopedSlots: { customRender: "operation" },
  },
];

export default {
  props: {
    data: {
      type: Array,
      required: true,
      default: () => [],
    },
    pagination: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      columns,
    };
  },
  computed: {
    tableData() {
      return this.data.map((item) => ({
        ...item,
        key: item.id,
      }));
    },
  },
  methods: {
    handleChangePage(pagination) {
      this.$emit("change", pagination);
    },
    handleProductEdit(record) {
      this.$emit("edit", record);
    },
    handleConfirm(record) {
      this.$emit("confirm", record);
    },
  },
};
</script>

<style scoped>
.operation {
  display: flex;
  justify-content: space-around;
}
</style>
