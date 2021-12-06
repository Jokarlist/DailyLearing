/**
 * 矩形类：可移动
 * 属性：宽度、高度、横纵坐标、横纵速度（像素/秒）、对应的dom元素
 */
class Rectangle {
  constructor(width, height, left, top, xSpeed, ySpeed, elem) {
    this.width = width;
    this.height = height;
    this.top = top;
    this.left = left;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.elem = elem;
    this.render();
  }

  /* 渲染矩形结构及位置 */
  render() {
    this.elem.style.width = `${this.width}px`;
    this.elem.style.height = `${this.height}px`;
    this.elem.style.left = `${this.left}px`;
    this.elem.style.top = `${this.top}px`;
  }

  /**
   * 
   * @param {单次移动的持续时间} duration 
   */
  move(duration) {
    const xDis = this.xSpeed * duration;
    const yDis = this.ySpeed * duration;

    this.left += xDis;
    this.top += yDis;
    // 处理有些元素的移动的边界问题，可采取调用其自身相应方法的手段
    this.onMove && this.onMove();
    this.render();
  }
}