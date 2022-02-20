module.exports = class {
  constructor(filename = "filelist.txt") {
    this.filename = filename;
  }

  apply(compiler) {
    compiler.hooks.emit.tap("FileListPlugin", (complation) => {
      const fileList = [];

      for (const key in complation.assets) {
        const content = `【${key}】\n大小：${
          complation.assets[key].size() / 1024
        }KB`;

        fileList.push(content);
      }

      const str = fileList.join("\n\n");

      complation.assets[this.filename] = {
        source() {
          return str;
        },
        size() {
          return str.length;
        },
      };
    });
  }
};
