const qs = require("qs");

module.exports = (req, res, next) => {
  if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
    let result = "";
    res.on("data", (chunk) => {
      result += chunk.toString("utf-8");
    });

    res.on("end", () => {
      const query = qs.parse(result);
      res.body = query;
      next();
    });
  } else {
    next();
  }
};
