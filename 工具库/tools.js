// 待封装的函数
//
//
// getElementPosition() 求元素相对于文档的坐标 P90

// 封装类似于insertBefore()的insertAfter()
function insertAfter(targetNode, afterNode) {}
// 查看浏览器视口尺寸
function getViewportOffset() {
  if (window.innerHeight) {
    return {
      w: window.innerWidth,
      h: window.innerHeight,
    };
  } else if (document.compatMode === "BackCompat") {
    return {
      w: document.body.clientWidth,
      h: document.body.clientHeight,
    };
  } else {
    return {
      w: document.documentElement.clientWidth,
      h: document.documentElement.clientHeight,
    };
  }
}
// 查看滚动条滚动的距离
function getScrollOffset() {
  if (window.pageXOffset) {
    return {
      x: window.pageXOffset,
      y: window.pageYOffest,
    };
  } else {
    return {
      x: document.body.scrollLeft + document.documentElement.scrollLeft,
      y: document.body.scrollTop + document.documentElement.scrollTop,
    };
  }
}
// 获取某dom元素的某样式信息
function getStyle(elem, prop) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(elem, null)[prop];
  } else {
    return elem.currentStyle[prop];
  }
}
// 给某dom对象的某事件类型添加一个事件处理函数
function addEvent(elem, type, handle) {
  if (elem.addEventListener) {
    elem.addEventListener(type, handle, false);
  } else if (elem.attachEvent) {
    elem.attachEvent("on" + type, function () {
      handle.call(elem);
    });
  } else {
    elem["on" + type] = handle;
  }
}
// 给某dom对象的某事件类型删除一个事件处理函数
function removeEvent(elem, type, handle) {
  if (elem.removeEventListener) {
    elem.removeEventListener(type, handle, false);
  } else if (elem.detachEvent) {
    elem.detachEvent("on" + type, handle);
  } else {
    elem["on" + type] = null;
  }
}
// 取消事件冒泡的函数
function stopBubble(event) {
  if (event.stopPropagation) {
    event.stopPropagation();
  } else {
    event.cancelBubble = true;
  }
}
// 阻止默认事件的函数
function cancelHandler(event) {
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  }
}
// 封装按需异步加载所需工具函数的函数
function asyncLoaded(url, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState == "complete" || script.readyState == "loaded") {
        tools[callback]();
        script.onreadystatechange = null;
      }
    };
  } else {
    script.onload = function () {
      tools[callback]();
    };
  }
  script.src = url;
  document.head.appendChild(script);
}
// 多物体多值运动+回调机制
var startMove = function (elem, propObj, callback) {
  clearInterval(elem.timer);
  var iSpeed = null;
  var iCur = null;

  elem.timer = setInterval(function () {
    var bStop = true;

    for (var prop in propObj) {
      if (prop === "opacity") {
        iCur = parseFloat(getStyle(elem, prop)) * 100;
        iSpeed = (propObj[prop] * 100 - iCur) / 7;
      } else {
        iCur = parseInt(getStyle(elem, prop));
        iSpeed = (propObj[prop] - iCur) / 7;
      }
      iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

      if (prop === "opacity") {
        elem.style[prop] = (iCur + iSpeed) / 100;
      } else {
        elem.style[prop] = iCur + iSpeed + "px";
      }

      if ((prop === "opacity" ? iCur / 100 : iCur) !== propObj[prop]) {
        bStop = false;
      }
    }

    if (bStop) {
      clearInterval(elem.timer);
      typeof callback === "function" && callback();
    }
  }, 30);
};
// 自动生成轮播图
HTMLDivElement.prototype.createCarousel = function (srcArr) {
  var len = srcArr.length;
};