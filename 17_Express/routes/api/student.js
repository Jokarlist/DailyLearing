const express = require("express");
const router = express.Router();
const stuSrv = null;
const getSendResult = require("../getSendResult");

router.get(
  "/",
  getSendResult(async ({ query: { page, limit, sex, name } }, res) => {
    page ??= 1;
    limit ??= 10;
    sex ??= -1;
    name ??= "";
    return await stuSrv.getStudent(page, limit, sex, name);
  })
);

router.get(
  "/:id",
  getSendResult(async (req, res) => await stuSrv.getStudentById(req.params.id))
);

router.post(
  "/",
  getSendResult(async (req, res) => await stuSrv.addStudent(req.body))
);

router.delete(
  "/:id",
  getSendResult(async (req, res) => await stuSrv.deleteStudent(req.params.id))
);

router.put(
  "/:id",
  getSendResult(
    async (req, res) => await stuSrv.updateStudent(req.params.id, req.body)
  )
);

module.exports = router;
