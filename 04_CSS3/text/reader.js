/**
 * 未处理成功的问题：
 * 1. 文字右出界判断
 * 2. 未解决在进行某一次transform时会被另一次打断（应上锁，但css无回调，
 * animate无法transform）
 */
var disX = null;
var xlatX = null;

$(".wrapper").mousedown(function (e) {
  disX = e.offsetX;
}).mouseup(function (e) {
  disX = e.offsetX - disX;

  if (disX < 0) {
    xlatX += 320;
  } else if (disX > 0) {
    xlatX = xlatX - 320 <= 0 ? 0 : xlatX - 320;
  }

  $(".content").css({
    transform: `translateX(-${xlatX}px)`
  });
});