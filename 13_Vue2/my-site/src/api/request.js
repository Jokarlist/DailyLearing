import axios from "axios";
import { showMessage } from "@/utils";

// 创建axios实例
const axiosIns = axios.create();

axiosIns.interceptors.response.use(function (res) {
  if (res.data.code !== 0) {
    showMessage({
      content: res.data.msg,
      type: "error",
      duration: 1500,
    });

    // 返回值作为请求返回的数据
    return null;
  }

  return res.data.data;
});

// 默认导出axios实例
export default axiosIns;
