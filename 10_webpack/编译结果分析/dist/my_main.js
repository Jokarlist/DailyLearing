((modules) => {
  // 用于缓存模块的导出结果
  const moduleCache = {};

  function require(moduleID) {
    // 判断是否该模块已有缓存
    if (moduleCache[moduleID]) {
      return moduleCache[moduleID];
    }
    // 用于存放该模块的运行结果
    const module = {
      exports: {},
    };
    // 运行该模块
    modules[moduleID](module, module.exports, require);
    // 缓存该模块运行的结果
    moduleCache[moduleID] = module.exports;

    return module.exports;
  }

  // 运行require函数相当于运行一个模块，得到模块导出结果
  require("./src/index.js");
})({
  "./src/a.js": function (module, exports) {
    /* console.log("module a");
    module.exports = "a"; */

    // 用eval函数来执行可以让浏览器提供一个新的环境执行其中的代码，若代码出
    // 错则方便调试
    eval(
      'console.log("module a");\nmodule.exports = "a";\n //# sourceURL=./src/a.js'
    );
  },
  "./src/index.js": function (module, exports, require) {
    /* console.log("module index");

    const a = require("./src/a.js");

    console.log(a); */

    eval(
      'console.log("module index");\nconst a = require("./src/a.js");\nconsole.log(a);\n //# sourceURL=./src/index.js'
    );
  },
});
