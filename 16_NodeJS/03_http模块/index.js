const http = require("http");
const fs = require("fs");
// const URL = require("url");
const path = require("path");

/**
 * 获取文件或目录的信息对象，没有则返回 null
 * @param {String} filename 文件路径
 * @returns <Promise> Stats 对象
 */
async function getStat(filename) {
  try {
    return await fs.promises.stat(filename);
  } catch {
    return null;
  }
}

/**
 * 获得要处理的文件的内容
 * @param {IncommingMessage} req
 * @returns <Promise> 文件对象
 */
async function getFileContent({ url, headers: { host } }) {
  // const urlObj = URL.parse(url);
  const urlObj = new URL(url, `http://${host}`);
  let filename = path.resolve(
    __dirname,
    "public",
    urlObj.pathname.substring(1)
  );
  let stat = await getStat(filename);
  if (!stat) {
    // 请求地址对应的文件不存在
    return null;
  } else if (stat.isDirectory()) {
    // 请求地址对应的文件是一个目录
    filename = path.resolve(filename, "index.html");
    // 查询该目录下是否有默认文件 index.html
    stat = await getStat(filename);
    if (!stat) {
      // 没有默认文件 index.html，则返回 null
      return null;
    } else {
      // 有默认文件 index.html，则读取其内容并返回
      return await fs.promises.readFile(filename);
    }
  } else {
    // 请求地址对应的文件是一个文件，直接读取其内容并返回
    return await fs.promises.readFile(filename);
  }
}

async function handler(req, res) {
  // const content = await getFileContent(req.url);
  const content = await getFileContent(req);
  if (content) {
    res.write(content);
  } else {
    res.statusCode = 404;
    res.write("Resource you requested is not existed");
  }

  res.end();
}

const server = http.createServer(handler);

server.on("listening", () => console.log("Listening on port 2333"));
server.listen(2333);
