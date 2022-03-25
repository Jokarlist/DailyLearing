const arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

function compare(a, b) {
  return a > b;
}

function exchange(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// 冒泡排序
function bubbleSort(arr) {
  if (!arr || arr.length === 0) {
    return;
  }

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (compare(arr[j], arr[j + 1])) {
        exchange(arr, j, j + 1);
      }
    }
  }
}

bubbleSort(arr);
console.log(arr);
