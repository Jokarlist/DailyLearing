var filterByText = function (filterText, arr) {
  if (!filterText) {
    return arr;
  } else {
    return arr.filter(function (elem) {
      return elem.name.indexOf(filterText) !== -1;
    })
  }
};