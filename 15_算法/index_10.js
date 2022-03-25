const arr = [8, 3, 6, 2, 9, 4, 0, 5, 1, 10];

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

/**
 * 标准快速排序
 * @param {Array} arr 
 * @param {Number} begin 快速排序起始leader点
 * @param {Number} end 
 * @returns 
 */
function quickSort(arr, begin, end) {
  // 若进行排序的数组的长度或对数组排序的部分的长度小于等于1，则直接返回
  if (end - begin <= 1) {
    return;
  }
  // 头指针
  let left = begin;
  // 尾指针
  let right = end;
  do {
    // 头指针小于尾指针且头指针指向的元素值小于leader的元素值则头指针往数组右移
    do {
      left++;
    } while (left < right && arr[left] < arr[begin]);
    // 头指针小于尾指针且尾指针指向的元素值大于leader的元素值则尾指针往数组左移
    do {
      right--;
    } while (left < right && arr[right] > arr[begin]);
    // 从上面两个循环中退出则表示头指针和尾指针都指向了不满足条件的元素值，或者头指针的位置大于等于尾指针
    if (left < right) {
      // 若头指针的位置仍然小于尾指针则交换两者指向的元素值
      swap(arr, left, right);
    }
  } while (left < right);
  /**
   * 计算应与leader交换的点的位置，分两种情况：
   * 1. 头尾指针位置相同时表示两者移动前中间还有一个元素，而头指针移动前指向的那个元素一定小于
   * leader元素的值，尾指针移动前指向的元素一定大于leader元素的值，而两者移动后指向的元素是否满足
   * 各自的条件还未判断，所以将头指针或尾指针前一个指向的元素与leader元素交换可以保证leader元素的
   * 左边一定比它小，右边一定比它大
   * 2. 尾指针位置大于头指针时表示两者移动前已相邻，则按上面的准则将尾指针指向的元素与leader元素交
   * 换即可
   */
  let swapPoint = left === right ? right - 1 : right;
  swap(arr, begin, swapPoint);
  // 继续对leader元素的两边的数组再分别进行快速排序
  quickSort(arr, begin, swapPoint);
  quickSort(arr, swapPoint + 1, end);
}

quickSort(arr, 0, arr.length);
console.log(arr);
