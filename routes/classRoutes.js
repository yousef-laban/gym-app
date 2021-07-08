const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const passport = require("passport");

const { classList, classCreate } = require("../controllers/classControllers");

router.get("/", classList);

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  classCreate
);

module.exports = router;
