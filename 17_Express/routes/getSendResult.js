module.exports = (handler) => {
  return async (req, res, next) => {
    try {
      const result = await handler(req, res, next);
      res.send(getResult(result));
    } catch (err) {
      next(err);
    }
  };
};

const getResult = (result) => ({
  code: 0,
  msg: "",
  data: result,
});


