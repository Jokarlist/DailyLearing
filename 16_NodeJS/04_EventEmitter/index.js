const MyRequest = require("./MyRequest");

const request = new MyRequest("http://www.baidu.com");

request.send();
request.on("response", (headers, body) => {
  console.log(headers);
  console.log(body.slice(0, 200));
});
