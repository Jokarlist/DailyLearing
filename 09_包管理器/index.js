const getNovels = require("./getNovels");
const fs = require("fs");

getNovels().then((novels) => {
  fs.writeFile("./录播课/DailyLearing/09_包管理器/novels.json", JSON.stringify(novels), () => {
    console.log("成功获取数据！");
  });
});
