var createStore = function (initState) {
  var state = initState || {};
  var list = [];

  var getState = function () {
    return state;
  };

  var dispatch = function (action) {
    state[action.type] = action.text;
    list.forEach(function (handler) {
      handler();
    });
  };

  var subscribe = function (handler) {
    list.push(handler);
  };

  return {
    getState: getState,
    dispatch: dispatch,
    subscribe: subscribe
  }
};