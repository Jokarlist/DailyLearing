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
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F3b0ce38d21909df5b8b8559b750f445d7f0dc239.jpg",
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_match%2F0%2F7846070549%2F0",
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
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F3b0ce38d21909df5b8b8559b750f445d7f0dc239.jpg",
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_match%2F0%2F7846070549%2F0",
            "https://img0.baidu.com/it/u=1650305178,3598934421&fm=253",
            "https://img2.baidu.com/it/u=2508611608,3658485126&fm=253",
          ],
        },
      ],
    },
  });
});
