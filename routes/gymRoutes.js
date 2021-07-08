const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const passport = require("passport");

const { gymList, gymCreate } = require("../controllers/gymControllers");

router.get("/", gymList);

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  gymCreate
);

module.exports = router;
