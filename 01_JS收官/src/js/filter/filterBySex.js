var filterBySex = function (sexStr, arr) {
  if (sexStr === "all") {
    return arr;
  } else {
    return arr.filter(function (elem) {
      return sexStr.indexOf(elem.sex) !== -1;
    })
  }
};