// 练习：读取一个目录中的所有子目录和文件
const path = require("node:path");
const fs = require("node:fs");

// 文件类
class File {
  constructor(filename, name, ext, isFile, size, createTime, updateTime) {
    this.filename = filename;
    this.name = name;
    this.ext = ext;
    this.isFile = isFile;
    this.size = size;
    this.createTime = createTime;
    this.updateTime = updateTime;
  }

  /**
   * 获取文件的内容
   * @param {Boolean} isBuffer 是否以 buffer 的形式读取文件内容
   */
  async getContent(isBuffer = false) {
    // 文件为目录，没有内容可读
    if (!this.isFile) {
      return null;
    }

    if (!isBuffer) {
      // 不以 buffer 的形式读取内容
      return await fs.promises.readFile(this.filename, "utf-8");
      // 以 buffer 的形式读取内容
    } else {
      return await fs.promises.readFile(this.filename);
    }
  }

  /**
   * 获取目录的所有子目录和文件
   */
  async getChildren() {
    if (this.isFile) {
      return [];
    }

    /**
     * 将 readdir 获得的当前目录的子目录和文件的文件名数组，然后遍历，分别得到用于获取这些
     * 文件名对应的绝对路径的 File 对象的 Promise，让它们组成一个新数组，然后放入 Promise.all
     * 中管理
     */
    const children = (await fs.promises.readdir(this.filename)).map((name) =>
      File.getFile(path.resolve(this.filename, name))
    );

    return Promise.all(children);
  }

  static async getFile(filename) {
    const stat = await fs.promises.stat(filename);
    return new File(
      filename,
      path.basename(filename),
      path.extname(filename),
      stat.isFile(),
      stat.size,
      new Date(stat.birthtime).toUTCString(),
      new Date(stat.mtime).toUTCString()
    );
  }
}

async function readDir(filename) {
  const file = await File.getFile(filename);
  // return await file.getContent(true);
  return await file.getChildren();
}

async function test() {
  const dirname = path.resolve(__dirname, "./test-file");
  const res = await readDir(dirname);
  console.log(res);
}

test();
