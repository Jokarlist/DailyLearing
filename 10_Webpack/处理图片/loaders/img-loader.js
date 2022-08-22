const loaderUtil = require("loader-utils");

function imgLoader(buffer) {
  console.log(`文件数据大小：${buffer.byteLength}（字节）`);
  const { limit = 1000, filename = "[contenthash:5].[ext]" } =
    loaderUtil.getOptions(this);
  let content = null;

  if (buffer.byteLength >= limit) {
    content = getFilePath.call(this, buffer, filename);
  } else {
    content = getBase64(buffer);
  }

  return `module.exports = \`${content}\``;
}

imgLoader.raw = true;

module.exports = imgLoader;

function getBase64(buffer) {
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

function getFilePath(buffer, filename) {
  filename = loaderUtil.interpolateName(this, filename, {
    content: buffer,
  });
  this.emitFile(filename, buffer);

  return filename;
}
