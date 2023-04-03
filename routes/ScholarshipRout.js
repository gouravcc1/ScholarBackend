const express = require("express");
const {
  GetAllScholarship,
  PostAScholarship,
  GetAScholarship,
  PutScholarship,
  UpdateScholarship,
  DeleteAScholarship,
  GetScholarshipStates,
} = require("../controllars/tourControlar");
const router = express.Router();

router.route("/").get(GetAllScholarship).post(PostAScholarship);
router
  .route("/:id")
  .get(GetAScholarship)
  .put(PutScholarship)
  .patch(UpdateScholarship)
  .delete(DeleteAScholarship);
module.exports = router;
