var combineFilter = function (obj) {
  var combineFilterObj = obj || {};

  return function (arr) {
    var lastArr = arr;

    for (var prop in combineFilterObj) {
      lastArr = combineFilterObj[prop](store.getState()[prop], lastArr);
    }

    return lastArr;
  }
};

var finalFilter = combineFilter({
  text: filterByText,
  sex: filterBySex
});