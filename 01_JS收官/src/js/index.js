var store = (function () {
  var personArr = [{
    name: '王港',
    src: './src/img/3.png',
    des: '颈椎不好',
    sex: 'm'
  }, {
    name: '刘莹',
    src: './src/img/5.png',
    des: '我是谁',
    sex: 'f'
  }, {
    name: '王秀莹',
    src: './src/img/4.png',
    des: '我很好看',
    sex: 'f'
  }, {
    name: '刘金雷',
    src: './src/img/1.png',
    des: '你没有见过陌生的脸',
    sex: 'm'
  }, {
    name: '刘飞翔',
    src: './src/img/2.png',
    des: '瓜皮刘',
    sex: 'm'
  }];
  var oUl = document.getElementsByTagName("ul")[0];
  var oInp = document.getElementsByTagName("input")[0];
  var oRadioArr = Array.prototype.slice.call(document.getElementsByClassName("btn"), 0);
  var lastRadio = oRadioArr[oRadioArr.length - 1];
  var store = createStore({ // 创建数据仓库
    text: "",
    sex: "all"
  });

  var init = function () {
    renderList(personArr);
    initEvents();
    store.subscribe(update); // 给数据仓库添加订阅
  };

  var initEvents = function () {
    oRadioArr.forEach(function (elem, index) {
      elem.addEventListener("click", onRadioClick, false);
    });
    oInp.oninput = debounce(onInpInput, 500);
  };

  /*表格数据获取函数 */
  var renderList = function (arr) {
    var htmlStr = "";

    arr.forEach(function (elem) {
      htmlStr += '<li><img src="' + elem.src + '"><p class="name">' + elem.name + '</p><p class="des">' + elem.des + '</p></li>';
    });
    oUl.innerHTML = htmlStr;
  };

  /* 表格数据更新函数 */
  var update = function () {
    renderList(finalFilter(personArr));
  };

  /* 性别单选框分页渲染函数 */
  var changeActive = function (e) {
    var curRadio = e.target;

    lastRadio.className = "btn";
    curRadio.className = "btn active";
    lastRadio = curRadio;
  };

  /* 性别单选框点击事件函数 */
  var onRadioClick = function (e) {
    var event = e || window.event;

    changeActive(event);
    store.dispatch({
      type: "sex",
      text: this.getAttribute("sex")
    });
  };

  /* 防抖函数 */
  var debounce = function (handler, delay) {
    var timer = null;

    return function (e) {
      var _self = this;
      var _arg = arguments;

      clearTimeout(timer);
      timer = setTimeout(function () {
        handler.apply(_self, _arg);
      }, delay);
    };
  };

  /* 搜索框输入函数 */
  var onInpInput = function () {
    store.dispatch({
      type: "text",
      text: this.value
    });
  };

  init();
  
  return store;
})();