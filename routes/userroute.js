const express = require("express");
const {
  GetAlluser,
  PostAuser,
  GetAuser,
  Putuser,
} = require("../controllars/usercontrolar");

const router = express.Router();
router.route("/").get(GetAlluser).post(PostAuser);
router.route("/:id").get(GetAuser).put(Putuser);

module.exports = router;
