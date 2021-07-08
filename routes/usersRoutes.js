const express = require("express");
const passport = require("passport");

const router = express.Router();

const {
  signup,
  signin,
  fetchUsers,
  signupOwner,
} = require("../controllers/userControllers");

// router.param("userId", async (req, res, next, userId) => {
//   const user = await fetchUser(userId, next);
//   if (user) {
//     req.user = user;
//     next();
//   } else next({ message: "User Not found", status: 404 });
// });

router.post(
  "/signup/owner",
  passport.authenticate("jwt", { session: false }),
  signupOwner
);
router.post("/signup", signup);

router.get("/users", fetchUsers);

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

module.exports = router;
