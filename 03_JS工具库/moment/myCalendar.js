(function () {
  var oTime1 = document.querySelector(".time1");
  var oTime2 = document.querySelector(".time2");
  var oTime3 = document.querySelector(".time3");
  var oWeek = document.querySelector(".week");
  var date = document.querySelector(".date");
  var upBtn = document.querySelector(".up")
  var downBtn = document.querySelector(".down");

  moment.locale("zh-cn");
  var today = moment();

  var init = function () {
    renderInstantTime();
    setInterval(renderInstantTime, 1000);
    renderInstantDate();
    renderWeekText();
    renderCalendar(today);
    initEvents();
  };

  var initEvents = function () {
    upBtn.addEventListener("click", onUpBtnClick, false);
    downBtn.addEventListener("click", onDownBtnClick, false);
  };

  /* 渲染日历头即时时间函数 */
  var renderInstantTime = function () {
    oTime1.innerHTML = moment().format("LTS");
  };

  /* 渲染日历主体区域头的星期表述函数 */
  var renderWeekText = function () {
    var weekdayArr = moment.weekdaysMin(true);

    weekdayArr.forEach(function (item) {
      oWeek.innerHTML += '<span>' + item + '</span>';
    });
  };

  /* 获取某月的天数（也即最后一天） */
  var getEndDay = function (moment) {
    return moment.daysInMonth();
  };

  /* 获取某月第一天所处的星期数 */
  var getFirstWeekday = function (moment) {
    return moment.startOf('month').weekday();
  };

  /* 渲染日历主体区域 */
  var renderCalendar = function (m) {
    // 获取上个月的最后一天
    var lastEndDay = getEndDay(m.clone().subtract(1, "month"));
    // 当前月的最后一天
    var curEndDay = getEndDay(m);
    // 当前月的第一天的星期数（索引值）
    var week = getFirstWeekday(m.clone());
    var str = "";
    // 渲染下个月日期的起始索引值
    var nextMonthStart = 0;

    for (var i = 0; i < 42; i++) {
      if (i < week) {
        // 此时应渲染上个月的日期
        str = '<li class="color">' +
          '<span>' + lastEndDay-- + '</span>' +
          '<span>' + getLunarDay(m.year(), m.month(), lastEndDay) + '</span>' +
          '</li>' + str;
      } else if (i > week - 1 + curEndDay) {
        // 此时应渲染下个月的日期
        str += '<li class="color">' +
          '<span>' + ++nextMonthStart + '</span>' +
          '<span>' + getLunarDay(m.year(), m.month() + 2, nextMonthStart) + '</span>' +
          '</li>';
      } else {
        // 此时应渲染本月的日期
        var tempClass = m.date() === i - week + 1 ? "active" : "";

        if (m.year() !== moment().year() || m.month() !== moment().month()) {
          tempClass = "";
        }

        str += '<li class="' + tempClass + '">' +
          '<span>' + (i - week + 1) + '</span>' +
          '<span>' + getLunarDay(m.year(), m.month() + 1, i - week + 1) + '</span>' +
          '</li>';
      }
    }

    oTime3.innerHTML = m.format("YYYY年MMM");
    date.innerHTML = str;
  };

  /* 上箭头点击事件处理函数 */
  var onUpBtnClick = function () {
    renderCalendar(today.subtract(1, "month"));
  };

  /* 下箭头点击事件处理函数 */
  var onDownBtnClick = function () {
    renderCalendar(today.add(1, "month"));
  };

  /* 获取日历主体区域农历日期信息 */
  var getLunarDay = function (year, month, date) {
    var lunarDay = window.calendar.solar2lunar(year, month, date);
    var result = "";

    if (lunarDay.IDayCn === "初一") {
      result = lunarDay.IMonthCn;
    } else if (lunarDay.Term) {
      result = lunarDay.Term;
    } else if (lunarDay.festival) {
      result = lunarDay.festival;
    } else if (lunarDay.lunarFestival) {
      result = lunarDay.lunarFestival;
    } else {
      result = lunarDay.IDayCn;
    }

    return result;
  };

  /* 渲染日历头即时日期函数 */
  var renderInstantDate = function () {
    var m = moment();
    var lunarDay = window.calendar.solar2lunar(m.year(), m.month() + 1, m.date());

    oTime2.innerHTML = m.format("LL") + " " + lunarDay.IMonthCn + lunarDay.IDayCn + " " + (lunarDay.Term ? lunarDay.Term : "");
  };

  init();
})();