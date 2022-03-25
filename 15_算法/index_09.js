const arr = [8, 3, 6, 2, 9, 4, 0, 5, 1, 10];

/**
 * 简单快速排序
 * @param {Array} arr 
 */
function quickSort(arr) {
  if (!arr || !arr.length) {
    return [];
  }
  // 选择基准比较leader元素
  const leader = arr[0];
  let left = [];
  let right = [];
  for (let i = 1; i < arr.length; i++) {
    // 比leader元素小的元素放入左数组
    if (arr[i] <= leader) {
      left.push(arr[i]);
    // 比leader元素大的元素放入右数组  
    } else {
      right.push(arr[i]);
    }
  }

  left = quickSort(left);
  right = quickSort(right);
  left.push(leader);
  
  return left.concat(right);
}

console.log(quickSort(arr));
