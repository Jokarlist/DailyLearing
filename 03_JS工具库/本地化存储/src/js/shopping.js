/**
 * 遇到的bug总结：
 * 1、变量要跨函数作用域传递（即在不同的函数作用域中访问同一个变量的同一个
 * 值）时，以引用值的形式声明变量，例如以数组的形式，其中第一个值即为变量向外
 * 暴露的值
 */
(function () {
  var colorValue = ""; // 选中的颜色
  var colorId = ""; // 选中商品对应的id
  var selectData = {}; // 用来存储所有的商品和商品信息

  var init = function () {
    initData();
    /* 非解决未来元素渲染问题，暂时将initEvents于initData中执行 */
    // initEvents();

    renderShoppingCart();
  };

  var initEvents = function () {
    /* 给商品页的每一行注册事件 */
    var trArr = document.querySelectorAll(".product tr"); // 获取到所有的行

    trArr.forEach(function (elem, index) {
      var tdArr = elem.children; // 当前行的所有td
      var img = tdArr[0].children[0]; // 商品图片
      var imgSrc = [img.getAttribute("src")]; // 商品图片的地址，要跨函数作用域传递，则以数组的形式声明
      var name = tdArr[1].children[0].innerHTML; // 商品的名字
      var colorArr = tdArr[1].children[1].children; // 单一商品的所有颜色按钮
      var price = parseInt(tdArr[2].innerHTML); // 商品价格
      var spanArr = tdArr[3].querySelectorAll("span"); // 加减按钮
      var strong = tdArr[3].querySelector("strong"); // 数量
      var addBtn = tdArr[4].children[0]; // 加入购物车按钮
      var selectNum = [0]; // 选中商品的数量，要跨函数作用域传递，则以数组的形式声明
      var last = [null]; // 上一次选中的按钮，要跨函数作用域传递，则以数组的形式声明

      for (var i = 0; i < colorArr.length; i++) {
        colorArr[i].index = i; // 添加一个自定义的属性为索引值
        colorArr[i].addEventListener("click", onColorClick(last, index, img, imgSrc), false);
      }

      spanArr[0].addEventListener("click", onMinusBtnClick(selectNum, strong), false);
      spanArr[1].addEventListener("click", onPlusBtnClick(selectNum, strong), false);
      addBtn.addEventListener("click", onAddBtnClick(last, index, strong, img, selectNum, name, imgSrc, price), false);

      // storage事件
      window.addEventListener("storage", onWindowStorage, false);
    });
  };

  /* 不同页面修改购物车内容触发storage事件绑定函数 */
  var onWindowStorage = function (e) {
    var event = e || window.event;

    renderShoppingCart();
  };

  /* 加入购物车按钮点击事件 */
  var onAddBtnClick = function (last, index, strong, img, selectNum, name, imgSrc, price) {
    return function () {
      if (!colorValue) {
        window.alert("请选择颜色");
        return;
      }
      if (selectNum[0] === 0) {
        window.alert("请选择数量");
        return;
      }

      selectData[colorId] = {
        id: colorId,
        name: name,
        color: colorValue,
        price: price,
        num: selectNum[0],
        img: imgSrc[0],
        time: new Date().getTime() // 获取该商品添加的时间以便之后用于排序
      };

      localStorage.setItem("shoppingCart", JSON.stringify(selectData));
      // 加入购物车后让所有已选择的内容还原
      img.src = 'src/img/img_0' + (index + 1) + '-1.png';
      last[0].className = "";
      strong.innerHTML = selectNum[0] = 0;
      // 存储完数据之后渲染购物车内容
      renderShoppingCart();
    }
  };

  /* 渲染购物车内容函数 */
  var renderShoppingCart = function () {
    selectData = JSON.parse(localStorage.getItem("shoppingCart")) || {};

    var tbodyObj = document.querySelector(".selected tbody");
    var totalPrice = document.querySelector(".selected th strong");
    var str = "";
    var total = 0;
    var goods = Object.values(selectData); // values()为ES7里的方法，用于取到对象里所有的value，并将其存放到一个数组里

    // 对已选择的商品降序排序（后添加的排在上面）
    goods.sort(function (g1, g2) {
      return g2.time - g1.time;
    });

    tbodyObj.innerHTML = "";
    for (var i = 0; i < goods.length; i++) {
      str += '<tr>' +
        '<td>' +
        '<img src="' + goods[i].img + '" alt="图片未正常显示">' +
        '</td>' +
        '<td>' +
        '<p>' + goods[i].name + '</p>' +
        '</td>' +
        '<td>' + goods[i].color + '</td>' +
        '<td>' + goods[i].price * goods[i].num + '.00元</td>' +
        '<td>' + goods[i].num + '</td>' +
        '<td><button data-id="' + goods[i].id + '">删除</button></td>' +
        '</tr>';
      total += goods[i].price * goods[i].num;
    }

    tbodyObj.innerHTML = str;
    totalPrice.innerHTML = total + ".00元";
    // 结构创建完成，添加删除功能
    renderDel();
  };

  /* 渲染删除按钮函数 */
  var renderDel = function () {
    var btnArr = document.querySelectorAll(".selected tbody button");
    var tbodyObj = document.querySelector(".selected tbody");

    for (var i = 0; i < btnArr.length; i++) {
      btnArr[i].onclick = function () {
        // 删除selectData和localStorage中的对应商品数据
        delete selectData[this.dataset.id];
        localStorage.setItem("shoppingCart", JSON.stringify(selectData));

        // 删除dom结构
        tbodyObj.removeChild(this.parentElement.parentElement);

        // 更新总价格
        var totalPrice = document.querySelector(".selected th strong");
        totalPrice.innerHTML = parseInt(totalPrice.innerHTML) - parseInt(this.parentNode.previousSibling.previousSibling.innerHTML) + ".00元";
      };
    }
  };

  /* 加按钮点击事件函数 */
  var onPlusBtnClick = function (selectNum, strong) {
    return function () {
      selectNum[0] = selectNum[0] + 1;
      strong.innerHTML = selectNum[0];
    }
  };

  /* 减按钮点击事件函数 */
  var onMinusBtnClick = function (selectNum, strong) {
    return function () {
      selectNum[0] = selectNum[0] - 1;
      selectNum[0] < 0 && (selectNum[0] = 0);
      strong.innerHTML = selectNum[0];
    }
  };

  /* 颜色选项点击事件函数 */
  var onColorClick = function (last, index, img, imgSrc) {
    return function () {
      last[0] && last[0] !== this && (last[0].className = "");

      if (this.className) { // 选定到已被选定的颜色
        this.className = "";
        colorValue = "";
        colorId = "";
        imgSrc[0] = 'src/img/img_0' + (index + 1) + '-1.png';
      } else { // 未选定到已被选定的颜色
        this.className = "active";
        colorValue = this.innerHTML;
        colorId = this.dataset.id;
        imgSrc[0] = 'src/img/img_0' + (index + 1) + '-' + (this.index + 1) + '.png';
      }

      /* this.className = this.className ? '' : 'active';
      colorValue = this.className ? this.innerHTML : '';
      colorId = this.className ? this.dataset.id : '';
      imgSrc = this.className ? 'src/img/img_0' + (index + 1) + '-' + (this.index + 1) + '.png' : 'src/img/img_0' + (index + 1) + '-1.png'; */

      img.src = imgSrc[0];
      last[0] = this;
    }
  };

  /* 获取数据 */
  var initData = function () {
    ajax("src/js/shoppingData.json", function (data) {
      renderGoodList(data);
      initEvents();
    });
  };

  /* 渲染商品页函数 */
  var renderGoodList = function (data) {
    var str = "";
    var tbodyObj = document.querySelector(".product tbody");

    data.forEach(function (item) {
      var color = ""; // 整合存储每条数据里的颜色信息

      item.list.forEach(function (product) {
        color += '<span data-id="' + product.id + '">' + product.color + '</span>';
      });

      str += '<tr>' +
        '<td>' +
        '<img src="' + item.list[0].img + '" alt="图片未正常显示">' +
        '</td>' +
        '<td>' +
        '<p>' + item.name + '</p>' +
        '<div class="color">' + color +
        '</div>' +
        '</td>' +
        '<td>' + item.list[0].price + '.00元</td>' +
        '<td>' +
        '<span>-</span>' +
        '<strong>0</strong>' +
        '<span>+</span>' +
        '</td>' +
        '<td>' +
        '<button>加入购物车</button>' +
        '</td>' +
        '</tr>';
    });

    tbodyObj.innerHTML = str;
  };

  init();
})();