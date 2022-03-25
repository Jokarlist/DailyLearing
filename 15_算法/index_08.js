const arr = [8, 3, 6, 2, 9, 4, 0, 5, 1, 10];
// const arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

function compare(a, b) {
  return a > b;
}

function exchange(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// 选择排序
function selectSort(arr) {
  if (!arr || arr.length === 0) {
    console.log(1);
    return;
  }

  for (let i = 0; i < arr.length - 1; i++) {
    let maxIndex = 0;
    for (let j = 0; j < arr.length - i; j++) {
      if (!compare(arr[maxIndex], arr[j])) {
        maxIndex = j;
      }
    }

    exchange(arr, maxIndex, arr.length - 1 - i);
  }
}

selectSort(arr);
console.log(arr);
