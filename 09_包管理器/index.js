const getNovels = require("./getNovels");
const fs = require("fs");

getNovels().then((novels) => {
  fs.writeFile("novels.json", JSON.stringify(novels), () => {
    console.log("成功获取数据！");
  });
});
