const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn } = require("../middlewares.js");
const userController = require("../controllers/users.js");

router.post("/signup", wrapAsync(userController.signup));
router.post("/login", wrapAsync(userController.login));
router.post("/logout", userController.logout);
router.get("/me", isLoggedIn, wrapAsync(userController.getMe));

module.exports = router;
