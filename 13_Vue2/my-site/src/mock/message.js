import Mock from "mockjs";
import qs from "qs";

/**
 * 提交留言
 */
Mock.mock("/api/message", "post", {
  code: 0,
  msg: "",
  data: {
    id: "@guid",
    nickname: "@cname",
    content: "@cparagraph(1, 10)",
    createDate: "@date('T')",
    "avatar|1": [
      "https://img0.baidu.com/it/u=3055514396,663073071&fm=253",
      "https://img0.baidu.com/it/u=54155028,2261720947&fm=253",
      "https://img0.baidu.com/it/u=1650305178,3598934421&fm=253",
      "https://img2.baidu.com/it/u=2508611608,3658485126&fm=253",
    ],
  },
});

Mock.mock(/^\/api\/message\/?(\?.+)?$/, "get", (options) => {
  return Mock.mock({
    code: 0,
    msg: "",
    data: {
      total: 52,
      [`rows|${qs.parse(options.url).limit || 10}`]: [
        {
          id: "@guid",
          nickname: "@cname",
          content: "@cparagraph(1, 10)",
          createDate: "@date('T')",
          "avatar|1": [
            "https://img0.baidu.com/it/u=3055514396,663073071&fm=253",
            "https://img0.baidu.com/it/u=54155028,2261720947&fm=253",
            "https://img0.baidu.com/it/u=1650305178,3598934421&fm=253",
            "https://img2.baidu.com/it/u=2508611608,3658485126&fm=253",
          ],
        },
      ],
    },
  });
});
