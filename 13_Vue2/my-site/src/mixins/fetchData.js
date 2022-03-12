/**
 * 公共的远程获取数据的代码，具体的组件中使用时，需要提供一个远程获取数据的方法 fetchData
 * @param {any} dataDefaultValue 要获取的数据的默认值
 */
export default function (dataDefaultValue = null) {
  return {
    data() {
      return {
        data: dataDefaultValue,
        isLoading: true,
      };
    },
    async created() {
      // 调用具体组件提供的 fetchData 方法
      this.data = await this.fetchData();
      this.isLoading = false;
    },
  };
}
